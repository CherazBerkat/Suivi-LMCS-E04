after cloning the app do not forget before working on server side run the following command
pip install -r requirements.txt

before every push delete the folder migrations in BDD and the file db.sqlite3
after pushing and pulling run the commands:
python manage.py makemigrsations bdd
python manage.py migrate
pyhton manage.py createsuperuser
pyhton manage.py generate_fake_data
pyhton manage.py runserver
