<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->string('content')->nullable(true);
            $table->timestamp('trip_date')->nullable(true);
            $table->integer('type')->nullable(false);
            $table->string('image_url_1')->nullable(true);
            $table->string('image_url_2')->nullable(true);
            $table->string('image_url_3')->nullable(true);
            $table->string('image_url_4')->nullable(true);
            $table->string('image_url_5')->nullable(true);
            $table->string('video_url')->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
