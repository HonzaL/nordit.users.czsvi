CREATE OR REPLACE FUNCTION ju2pk(utc character varying DEFAULT '2451544.50000000:0'::character varying)
  RETURNS bigint AS
$BODY$
DECLARE
  pktime bigint;
BEGIN
  EXECUTE 'SELECT ((substring(' || quote_literal($1) || ' from 1 for 16)::numeric - 2451544.5)*86400)::bigint' INTO pktime;
  RETURN pktime;
END;
$BODY$
  LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION put_pktime()
  RETURNS trigger AS
$BODY$
  BEGIN
    NEW.pktime := ju2pk(NEW."UTC");
    return NEW;
  END;
$BODY$
  LANGUAGE plpgsql;

CREATE TRIGGER put_pktime_ardcbp_xslow
  BEFORE INSERT OR UPDATE
  ON "arDCBP_xslow"
  FOR EACH ROW
  EXECUTE PROCEDURE put_pktime();

--CREATE TRIGGER put_pktime_ardcch_xslow
--  BEFORE INSERT OR UPDATE
--  ON "arDCCH_xslow"
--  FOR EACH ROW
--  EXECUTE PROCEDURE put_pktime();

CREATE INDEX "arDCBP_xslow_pktime"
  ON "arDCBP_xslow"
  USING btree
  (pktime);

--CREATE INDEX "arDCCH_xslow_pktime"
--  ON "arDCCH_xslow"
--  USING btree
--  (pktime);

UPDATE "arDCBP_xslow" SET pktime = 0;
