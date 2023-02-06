DELIMITER $$
CREATE PROCEDURE insert_data()
BEGIN
  DECLARE num_rows INT;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = ${table_name} ) THEN
    SELECT COUNT(*) INTO num_rows FROM ${table_name} ;
    IF num_rows < 1 THEN
      INSERT INTO test_table (date), value) VALUES ?;
    END IF;
  ELSE
    CREATE TABLE test_table (
      id INT AUTO_INCREMENT PRIMARY KEY,
      value INT NOT NULL
    );
    INSERT INTO test_table (value) VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9), (10);
  END IF;
END $$
DELIMITER ;