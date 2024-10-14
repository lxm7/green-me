CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  business_type TEXT,       -- Corresponds to "business"
  score NUMERIC,            -- New field
  accreditors BOOLEAN,      -- New field
  coordinates GEOGRAPHY(POINT)
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  business_id UUID REFERENCES businesses(id),
  green_score NUMERIC,
  environment_score NUMERIC,
  co2e NUMERIC,                     -- New field
  category TEXT,                     -- New field
  published_lcas TEXT[],            -- Changed from JSONB to TEXT[]
  coordinates GEOGRAPHY(POINT),
  CONSTRAINT fk_business
    FOREIGN KEY(business_id)
      REFERENCES businesses(id)
      ON DELETE CASCADE
);

CREATE TABLE product_keywords (
  product_id UUID REFERENCES products(id),
  keyword TEXT,
  PRIMARY KEY (product_id, keyword)
);

-- PublishedLCAs Table
CREATE TABLE published_lcas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);
