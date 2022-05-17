<?php

return [
    'employee' => [
        'create' => [
            'department' => 'required|integer',
            'name' => 'required|regex:/[a-zA-Z]{1,} *[a-zA-Z]*/',
            'dob' => 'required|regex:/[0-9]{4}-[0-9]{2}-[0-9]{2}/',
            'phone' => 'required|regex:/[0-9]{9}/',
            'email' => 'required|email|unique:employees,email',
            'salary' => 'required|regex:/[0-9]{4,}/',
        ],
        'update' => [
            'department' => 'required|integer',
            'name' => 'required|regex:/[a-zA-Z]{1,} *[a-zA-Z]*/',
            'dob' => 'required|regex:/[0-9]{4}-[0-9]{2}-[0-9]{2}/',
            'phone' => 'required|regex:/[0-9]{9}/',
            'salary' => 'required|regex:/[0-9]{4,}/',
        ]
    ]
];