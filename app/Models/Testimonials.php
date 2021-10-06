<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $user_id
 * @property string $from_name
 * @property string $from_title
 * @property string $content
 * @property int $type
 * @property string $user_img_url
 * @property string $video_url
 * @property string $created_at
 * @property string $updated_at
 * @property User $user
 */
class Testimonials extends Model
{
    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = ['user_id', 'from_name', 'from_title', 'content', 'type', 'user_img_url', 'video_url', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
