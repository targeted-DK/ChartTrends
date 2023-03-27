import sys
from os.path import join, dirname, abspath

venv_path = abspath(join(dirname(__file__), "..", "..", "myenv", "lib", "python3.10", "site-packages"))
sys.path.insert(0, venv_path)



import analysisa