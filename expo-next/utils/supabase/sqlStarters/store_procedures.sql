create or replace function fetch_businesses_with_products (
  search_term text,
  longitude FLOAT8,
  latitude FLOAT8,
  radius FLOAT8
) returns JSONB as $$
BEGIN
  RETURN (
    SELECT jsonb_agg(business_data)
    FROM (
      SELECT
        b.id,
        jsonb_build_object(
          'name', b.name,
          'business', b.business_type,
          'score', b.score,
          'accreditors', b.accreditors,
          'coordinates', ST_AsGeoJSON(b.coordinates)::jsonb,
          'products', jsonb_agg(
            jsonb_build_object(
              'name', p.name,
              'price', p.price,
              'available', p.available,
              'business', b.business_type,
              'greenScore', p.green_score,
              'environmentScore', p.environment_score,
              'co2e', p.co2e,
              'publishedLCAs', (
                SELECT jsonb_agg(l.name)
                FROM product_published_lcas ppl
                JOIN published_lcas l ON ppl.lca_id = l.id
                WHERE ppl.product_id = p.id
              ),
              'keywords', (
                SELECT jsonb_agg(pk2.keyword)
                FROM product_keywords pk2
                WHERE pk2.product_id = p.id
              ),
              'coordinates', ST_AsGeoJSON(p.coordinates)::jsonb
            )
          )
        ) AS document
      FROM
        businesses b
      JOIN
        products p ON p.business_id = b.id
      JOIN
        product_keywords pk ON pk.product_id = p.id
      WHERE
        pk.keyword ILIKE '%' || search_term || '%'
        AND ST_DWithin(
          b.coordinates,
          ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography,
          radius
        )
      GROUP BY
        b.id
    ) AS business_data
  );
END;
$$ language plpgsql;