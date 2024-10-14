CREATE INDEX idx_businesses_name ON businesses(name);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_product_keywords ON product_keywords USING GIN (keyword gin_trgm_ops);
CREATE INDEX idx_products_coordinates ON products USING GIST (coordinates);
CREATE INDEX idx_products_name ON products USING GIN (name gin_trgm_ops);