
# import numpy as np;
import sys
import json
import os
import numpy as np
import pandas as pd
import pmdarima
import scipy.stats as stats
from statsmodels.tsa.stattools import grangercausalitytests
from datetime import datetime, timedelta
from sklearn.impute import SimpleImputer
from sklearn.metrics import r2_score
from sklearn import preprocessing
from sklearn.preprocessing import MinMaxScaler
import calc_functions
import fastdtw as fastdtw
from scipy.spatial.distance import euclidean
# print("PYTHONPATH:", os.enron.get('PYTHONPATH'))
# print("PATH:", os.environ.get('PATH'))


output = {}
# tag = primary data fred tag,
primary_data_params_string = input()
json_secondary_tag_string = input()
json_secondary_data_string = input()


# #returns list but still a json
# print(jsonDataString)


# dumps() returns string object, loads() return python object
primary_data_params = json.loads(primary_data_params_string)
json_tag = json.loads(json_secondary_tag_string)
json_data = json.loads(json_secondary_data_string)
data_frequency = primary_data_params['frequency']
a = json_tag.index(primary_data_params['tag'])

# find primary data and filter date
main_data_index = json_tag.index(primary_data_params['tag'])
main_trimmed_data = [{'id': d['id'], 'date': calc_functions.trim_date(
    d['date'][:10], data_frequency), 'value': d['value'], 'indicator_id': d['indicator_id']} for d in json_data[main_data_index]]
json_data[main_data_index] = main_trimmed_data

main_data_last_date = json_data[main_data_index][-1]['date']
main_data_size = len(json_data[main_data_index])

# Trim dates for monthly, quarterly, semi-annual and annual
for i in range(len(json_data)):
   
    sub_data_size = len(json_data[i])
    main_data = 0
    sub_data = 0

    # this prevents modification of original data. you can also use list comprehension too
    # trims date into YYYY-MM-DD format. Check calc_functions.trim_date()
    if i == main_data_index :
       continue;

    trimmed_data = [{'id': d['id'], 'date': calc_functions.trim_date(
        d['date'][:10], data_frequency), 'value': d['value'], 'indicator_id': d['indicator_id']} for d in json_data[i]]
    json_data[i] = trimmed_data
    sub_data_last_date = json_data[i][-1]['date']

    # print(json_data[main_data_index])
    overlapping_dates = calc_functions.overlapping_dates([d['date'] for d in json_data[main_data_index]], [d['date'] for d in json_data[i]])

    main_data_overlapping_values = [d['value'] for d in main_trimmed_data if d['date'] in overlapping_dates]
    sub_data_overlapping_values = [d['value'] for d in json_data[i] if d['date'] in overlapping_dates]



    main_data_imputed = calc_functions.fill_missing_values(
        main_data_overlapping_values)
    sub_data_imputed = calc_functions.fill_missing_values(
        sub_data_overlapping_values)

    # works same as sklearn.preprocessing.minmaxscaler
    main_data_normalized = calc_functions.normalize(main_data_imputed)
    sub_data_normalized = calc_functions.normalize(sub_data_imputed)

    # linearity, non-linearity, non-linearity
    # uncomment these lines and output if you wanna use different stats
    # pearson_corr = stats.pearsonr(
    #     main_data_normalized, sub_data_normalized)[0]
    # spearman_corr = stats.spearmanr(
    #     main_data_normalized, sub_data_normalized)[0]
    # kendall_corr = stats.kendalltau(
    #     main_data_normalized, sub_data_normalized)[0]
    
   
    dtwresult = fastdtw.fastdtw(np.array([main_data_normalized]), np.array([sub_data_normalized]), dist = euclidean)[0]; 
    
    # output[json_tag[i]] = {"pearson": pearson_corr,
    #                        "spearman": spearman_corr,
    #                        "kendall": kendall_corr,
    #                        "dtw" : dtwresult}

    output[json_tag[i]] = {"dtw" : dtwresult}
                        

#DONT FUCKING DELETE THIS PRINT - SENDS DATA BACK TO NODE.JS
print(output)
sys.stdout.flush()
print("Python end.")

