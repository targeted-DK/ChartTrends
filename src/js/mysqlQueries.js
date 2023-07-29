const queries = {
  // CREATE TABLES IN MYSQL FOR THE FIRST TIME
  CREATE_DATABASE: `CREATE DATABASE IF NOT EXISTS ??`,

  // DATABASE_NAME VARCHAR(20) deleted from check_indicator_table_if_exists
  //because catalog.?? is already an DATABASE_NAME;
  CHECK_INDICATOR_TABLE_IF_EXISTS: `CREATE TABLE IF NOT EXISTS catalog.?? (
      indicator_id INT PRIMARY KEY AUTO_INCREMENT,
      tag VARCHAR(30),
      description TEXT,
      frequency VARCHAR(10),
      transformation VARCHAR(10),
      aggregation VARCHAR(10),
      units VARCHAR(30),
      last_updated_time VARCHAR(20),
      asset_type VARCHAR(20)
    )`,


  CHECK_OPENAI_TABLE_IF_EXISTS: `SELECT * FROM ??.??`,

  CHECK_IF_OPENAI_RESPONSE_OLDER_THAN_A_MONTH: `SELECT * FROM ??.?? WHERE last_updated_time < ??`,
  DROP_OPENAI_TABLE: `DROP TABLE ??.??`,
  CREATE_OPENAI_TABLE: `CREATE TABLE ??.?? (
  indicator_id INT PRIMARY KEY AUTO_INCREMENT,
  openai_response TEXT,
  last_updated_time DATE
)`,

  INSERT_DATA_TO_OPENAIRESULT_TABLE: `INSERT INTO ??.?? (openai_response, last_updated_time) VALUES (?,?)`,
  UPDATE_OPENAIRESULT_TABLE: `UPDATE ??.?? SET openai_response = ??, last_updated_time = ?? where id = 0`,

  CREATE_DATA_TABLE: `CREATE TABLE IF NOT EXISTS ??.?? (
      id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      date DATETIME,
      value DOUBLE,
      indicator_id INT,
      FOREIGN KEY (indicator_id) REFERENCES catalog.??(indicator_id)
    )`,

  CREATE_DATA_TABLE_CFTC_LEGACYFUTONLY: `CREATE TABLE IF NOT EXISTS ??.?? (
      id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      date DATETIME,
      open_interest_all DOUBLE,
    noncomm_positions_long_all DOUBLE,
    noncomm_positions_short_all DOUBLE,
    comm_positions_long_all DOUBLE,
    comm_positions_short_all DOUBLE,
    tot_rept_positions_long_all DOUBLE,
    tot_rept_positions_short DOUBLE,
    nonrept_positions_long_all DOUBLE,
    nonrept_positions_short_all DOUBLE,
      noncomm_positions_net DOUBLE,
      comm_positions_net DOUBLE,
      tot_rept_positions_net DOUBLE,
      nonrept_positions_net DOUBLE,
    
      indicator_id INT,
      FOREIGN KEY (indicator_id) REFERENCES catalog.??(indicator_id)
    )`,

  CREATE_DATA_TABLE_CFTC_DISAGGREGATEDFUTONLY: `CREATE TABLE IF NOT EXISTS ??.?? (
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
  INSERT_DATA_TO_TABLE_CFTC_DISAGGREGATEDFUTONLY: `INSERT INTO ??.?? (date, 
    open_interest_all,    
    m_money_positions_long_all,
    m_money_positions_short_all,
    change_in_m_money_long_all,
    change_in_m_money_short_all, 
    indicator_id) VALUES ?`,
  INSERT_DATA_TO_TABLE_CFTC_LEGACYFUTONLY: `INSERT INTO ??.?? (date, 
      open_interest_all,    
      noncomm_positions_long_all,
      noncomm_positions_short_all,
      comm_positions_long_all,
      comm_positions_short_all,
      tot_rept_positions_long_all,
      tot_rept_positions_short,
      nonrept_positions_long_all,
      nonrept_positions_short_all,
      noncomm_positions_net,
      comm_positions_net,
      tot_rept_positions_net,
      nonrept_positions_net,
      indicator_id) VALUES ?`,

  INSERT_DATA_TO_TABLE_DUC: `INSERT INTO ??.?? (date, drilled, completed, DUC, indicator_id) VALUES ?`,

  SHOW_ALL_TABLES: `SHOW TABLES FROM ??`,

  SELECT_ALL_INDICATOR_ROWS_FROM_SOURCE: `SELECT * FROM catalog.??`,

  SELECT_AN_INDICATOR_ROW_BY_TAG: `SELECT * 
  FROM catalog.??
  WHERE tag = ?`,
  //basically getting data for one graph
  SELECT_ALL_ROWS_FROM_TABLE: `SELECT * FROM ??.??`,

  SELECT_ALL_INDICATOR_ROWS_BY_ASSET_TYPE: `SELECT * 
                                            FROM catalog.??
                                            WHERE asset_type = ?`,

  SELECT_UNITS_FROM_CATALOG: `SELECT units FROM catalog.?? WHERE tag = ? AND frequency = ? AND transformation = ? AND aggregation = ? `,

  // SELECT_INDICATOR_FROM_EIA_INDICATORS : `SELECT DATABASE_NAME, description, frequency, aggregation, units, last_updated_time
  //                     FROM catalog.EIA
  //                     WHERE tag = ?`,

  SELECT_LAST_UPDATE_TIME_IN_OPENAIRESULT_TABLE: `SELECT last_update_time FROM OPENAIRESULT.?`,

  FIND_DUPLICATE_IN_INDICATOR_TABLE: `SELECT indicator_id, tag, description, frequency, transformation, aggregation, units, last_updated_time, asset_type 
  FROM catalog.?? 
  WHERE tag = ? AND frequency = ? AND transformation = ? AND aggregation = ?`,

  UPDATE_CATALOG: `UPDATE catalog.?? SET last_updated_time = ? WHERE indicator_id = ?`,

  TRUNCATE_TABLE: "TRUNCATE TABLE ??.??",

  // CHECK_IF_DATA_EXISTS_IN_CATALOG : `SELECT table_name, frequency, transformation, aggregation
  //                                     FROM catalog.indicators
  // `

  ADD_INDICATOR_TO_TABLE: `INSERT INTO catalog.?? (tag, description, frequency, transformation, aggregation, units, last_updated_time, asset_type) VALUES (?,?,?,?,?,?,?,?)`,
};

export default queries;
