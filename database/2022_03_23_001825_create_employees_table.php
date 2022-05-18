<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("department_id");
            $table->string("name");
            $table->date("dob");
            $table->integer("phone");
            $table->string("photo")->nullable()->default(null);
            $table->string("email");
            $table->integer("salary");
            $table->enum("status", ["active", "inactive"])->default("active");
            $table->timestamps();

            $table->foreign("department_id")->references("id")->on("departments");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
