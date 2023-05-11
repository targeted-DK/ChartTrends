import numpy as np
import datetime as datetime


def fill_missing_values(lst):
    for i in range(len(lst)):
        if lst[i] == 0:
            start = max(0, i - 2)
            end = min(len(lst), i + 3)
            mean = sum(lst[start:end]) / (end - start - 1)
            lst[i] = mean
    return lst


def normalize(lst):
    arr = np.array(lst)
    return (arr - arr.min()) / (arr.max() - arr.min())


def trim_date(date_string, frequency):
    dt = datetime.datetime.fromisoformat(date_string)

    if frequency == 'd':
        return dt.strftime('%Y-%m-%d')
    elif frequency == 'w':
        # trim to start of week (Monday)
        dt -= datetime.timedelta(days=dt.weekday())
        return dt.strftime('%Y-%m-%d')
    elif frequency == 'm':
        return dt.strftime('%Y-%m')
    elif frequency == 'q':
        # trim to start of quarter
        quarter_start_month = ((dt.month-1)//3)*3+1
        dt = datetime.datetime(dt.year, quarter_start_month, 1)
        return dt.strftime('%Y-%m')
    elif frequency == 'sa':
        # trim to start of semiannual period
        sa_start_month = 1 if dt.month <= 6 else 7
        dt = datetime.datetime(dt.year, sa_start_month, 1)
        return dt.strftime('%Y-%m')
    elif frequency == 'a':
        return dt.strftime('%Y')
    else:
        raise ValueError(f"Invalid frequency: {frequency}")

def overlapping_dates(dates1, dates2):
        # Convert dates to sets for efficient intersection calculation
    set1 = set(dates1)
    set2 = set(dates2)

    # Find overlapping dates
    overlapping = set1.intersection(set2)
    return sorted(list(overlapping))
