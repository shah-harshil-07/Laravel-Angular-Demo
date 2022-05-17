## Steps of the project setup

# Step 1 
Take clone of the repository in your local system. Unzip the cloned repository.

# Step 2
Create a new database of any name in MySQL.

# Step 3
In .env file, set the value of DB_DATABASE equal to the name of the newly created database in MySQL. If .env file is not available, go to the folder containing .env.example file and run 'sudo cp .env.example .env' and then set the value.

# Step 4
Run the following commands in terminal:-
1). composer require
2). php artisan migrate --seed
3). cd resources/frontend/angular
4). npm install

# Step 5
Make a virtualhost path pointing to the public directory of this project. Uncomment the keys imageUrl and localhostUrl and set the values of those keys according to the instructions written over there.

# Step 6
Run ng s -o command in the terminal.
