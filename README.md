## Steps of the project setup

# Step 1 
Take clone of the repository in your local system. Unzip if the zipped repository is downloaded.

# Step 2
Create a new database of any name in MySQL.

# Step 3
In .env file, set the value of DB_DATABASE equal to the name of the newly created database in MySQL. If .env file is not available, go to the folder containing .env.example file and run 'sudo cp env.example .env' and then set the value.

# Step 4
Run the following commands in terminal:-
1). composer install
2). php artisan migrate --seed
3). php artisan serve
4). (In an new terminal) cd resources/frontend/angular
5). npm install

# Step 5
Make a virtualhost path pointing to the public directory of this project. Uncomment the key imageUrl in resources/frontend/angular/src/environments/environment.ts and set the value of that key according path leading to the images folder inside public directory of the project.

# Step 6
Run ng s -o command in the terminal.
