<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "book".
 *
 * @property int $id
 * @property string $bookname
 * @property string $author
 * @property string $publish
 * @property int $pages
 */
class Book extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'book';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['bookname', 'author', 'publish', 'pages'], 'required'],
            [['pages'], 'integer'],
            [['bookname'], 'string', 'max' => 50],
            [['author'], 'string', 'max' => 10],
            [['publish'], 'string', 'max' => 30],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'bookname' => '书名',
            'author' => '作者',
            'publish' => '出版社',
            'pages' => '页数',
        ];
    }
}
