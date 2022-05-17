<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('employees')->insert([
            [
                'department_id' => 1,
                'name' => "Thomas Shelby",
                'dob' => '1998-08-20',
                'phone' => 456789123,
                'photo' => 'img1.jpg',
                'email' => 'thomas.shelby@yopmail.com',
                'salary' => 85000,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'department_id' => 1,
                'name' => "Aurthur Shelby",
                'dob' => '1994-04-01',
                'phone' => 789456123,
                'photo' => 'img2.jpg',
                'email' => 'aurthur.shelby@yopmail.com',
                'salary' => 650000,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'department_id' => 1,
                'name' => "Pollyana Gray",
                'dob' => '1996-05-28',
                'phone' => 654783210,
                'photo' => 'img3.jpeg',
                'email' => 'polly.gray@yopmail.com',
                'salary' => 55000,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'department_id' => 2,
                'name' => "Gina Gray",
                'dob' => '2000-10-01',
                'phone' => 321456897,
                'photo' => 'img4.jpg',
                'email' => 'gina.gray@yopmail.com',
                'salary' => 80000,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'department_id' => 2,
                'name' => "Michael Shelby",
                'dob' => '1999-12-05',
                'phone' => 123456789,
                'photo' => 'img5.jpg',
                'email' => 'michael.shelby@yopmail.com',
                'salary' => 80000,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'department_id' => 3,
                'name' => "Harshil Shah",
                'dob' => '1998-08-20',
                'phone' => 990416850,
                'photo' => null,
                'email' => 'harshil.shah@yopmail.com',
                'salary' => 250000,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'department_id' => 3,
                'name' => "Marty Byrde",
                'dob' => '1998-08-20',
                'phone' => 456123789,
                'photo' => null,
                'email' => 'marty.byrde@yopmail.com',
                'salary' => 4567891,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'department_id' => 2,
                'name' => "Wendy Byrde",
                'dob' => '1994-05-15',
                'phone' => 159357486,
                'photo' => null,
                'email' => 'wendy.byrde@yopmail.com',
                'salary' => 75000,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'department_id' => 1,
                'name' => "Frank Underwood",
                'dob' => '1996-07-13',
                'phone' => 214568703,
                'photo' => null,
                'email' => 'frank.underwood@yopmail.com',
                'salary' => 45000,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'department_id' => 5,
                'name' => "Claire Underwood",
                'dob' => '1998-03-23',
                'phone' => 654789321,
                'photo' => null,
                'email' => 'claire.underwood@yopmail.com',
                'salary' => 50000,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'department_id' => 6,
                'name' => "Doug Stamper",
                'dob' => '1999-01-14',
                'phone' => 325896470,
                'photo' => null,
                'email' => 'doug.stamper@yopmail.com',
                'salary' => 65000,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'department_id' => 3,
                'name' => "Clay Jensen",
                'dob' => '1997-08-16',
                'phone' => 486235971,
                'photo' => null,
                'email' => 'clay.jensen@yopmail.com',
                'salary' => 750000,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'department_id' => 2,
                'name' => "Harvey Specter",
                'dob' => '1992-12-20',
                'phone' => 654872319,
                'photo' => null,
                'email' => 'harvey.specter@yopmail.com',
                'salary' => 500000,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
