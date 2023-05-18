const queries = {
  // CREATE TABLES IN MYSQL FOR THE FIRST TIME
  CREATE_DATABASE: `CREATE DATABASE IF NOT EXISTS ??`,

  CHECK_INDICATOR_TABLE_IF_EXISTS: `CREATE TABLE IF NOT EXISTS catalog.?? (
      indicator_id INT PRIMARY KEY AUTO_INCREMENT,
      DATABASE_NAME VARCHAR(20),
      tag VARCHAR(20),
      description TEXT,
      frequency VARCHAR(5),
      transformation VARCHAR(5),
      aggregation VARCHAR(5),
      units VARCHAR(40),
      last_updated_time VARCHAR(40),
      asset_type VARCHAR(20)
    )`,

  CREATE_DATA_TABLE: `CREATE TABLE IF NOT EXISTS ??.?? (
      id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      date DATETIME,
      value DOUBLE,
      indicator_id INT,
      FOREIGN KEY (indicator_id) REFERENCES catalog.??(indicator_id)
    )`,

  CREATE_DATA_TABLE_CFTC: `CREATE TABLE IF NOT EXISTS ??.?? (
      id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      date DATETIME,
      open_interest_all DOUBLE,
      m_money_positions_long_all DOUBLE,
      m_money_positions_short_all DOUBLE,
      change_in_m_money_long_all DOUBLE,
      change_in_m_money_short_all DOUBLE,
      indicator_id INT,
      FOREIGN KEY (indicator_id) REFERENCES catalog.??(indicator_id)
    )`,

  //in this case it will be EIA.REGIONNAME, not EIA.TAG
  CREATE_DATA_TABLE_DUC: `CREATE TABLE IF NOT EXISTS ??.?? (
      id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      date DATETIME,
      drilled SMALLINT,
      completed SMALLINT,
      DUC SMALLINT,
      indicator_id INT,
      FOREIGN KEY (indicator_id) REFERENCES catalog.??(indicator_id)
    )`,

  INSERT_DATA_TO_TABLE: `INSERT INTO ??.?? (date, value, indicator_id) VALUES ?`,
  INSERT_DATA_TO_TABLE_CFTC: `INSERT INTO ??.?? (date, 
    open_interest_all,    
    m_money_positions_long_all,
    m_money_positions_short_all,
    change_in_m_money_long_all,
    change_in_m_money_short_all, 
    indicator_id) VALUES ?`,
  INSERT_DATA_TO_TABLE_DUC: `INSERT INTO ??.?? (date, drilled, completed, DUC, indicator_id) VALUES ?`,
  // SHOW_INDICATOR_TABLE: `SHOW TABLES LIKE 'indicators'`,

  SHOW_ALL_TABLES: `SHOW TABLES FROM ??`,

  SELECT_ALL_INDICATOR_ROWS_FROM_SOURCE: `SELECT * FROM catalog.??`,

  //basically getting data for one graph
  SELECT_ALL_ROWS_FROM_TABLE: `SELECT * FROM ??.??`,

  SELECT_ALL_INDICATOR_ROWS_BY_ASSET_TYPE: `SELECT * 
                                            FROM catalog.??
                                            WHERE asset_type = ?`,

  // SELECT_INDICATOR_FROM_EIA_INDICATORS : `SELECT DATABASE_NAME, description, frequency, aggregation, units, last_updated_time
  //                     FROM catalog.EIA
  //                     WHERE tag = ?`,

  FIND_DUPLICATE_IN_INDICATOR_TABLE: `SELECT indicator_id, tag, frequency, transformation, last_updated_time, aggregation, asset_type 
  FROM catalog.?? 
  WHERE tag = ? AND frequency = ? AND transformation = ? AND aggregation = ? AND asset_type = ?`,
  UPDATE_CATALOG: `UPDATE catalog.?? SET last_updated_time = ? WHERE indicator_id = ?`,

  TRUNCATE_TABLE: "TRUNCATE TABLE ??.??",

  // CHECK_IF_DATA_EXISTS_IN_CATALOG : `SELECT table_name, frequency, transformation, aggregation
  //                                     FROM catalog.indicators
  // `

  ADD_INDICATOR_TO_TABLE: `INSERT INTO catalog.?? (tag, frequency, description, units, transformation, DATABASE_NAME, last_updated_time, aggregation, asset_type) VALUES (?,?,?,?,?,?,?,?,?)`,
};

export default queries;
