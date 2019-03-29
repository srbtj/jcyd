<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use app\models\BookForm;

class SiteController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        return $this->render('index');
    }

    /**
     * Login action.
     *
     * @return Response|string
     */
    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        }

        $model->password = '';
        return $this->render('login', [
            'model' => $model,
        ]);
    }

    /**
     * Logout action.
     *
     * @return Response
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Displays contact page.
     *
     * @return Response|string
     */
    public function actionContact()
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');

            return $this->refresh();
        }
        return $this->render('contact', [
            'model' => $model,
        ]);
    }

    /**
     * Displays about page.
     *
     * @return string
     */
    public function actionAbout()
    {
        return $this->render('about');
    }

    public function index(){

        $art=M("art");
        $where='';
        $w=trim(I("w"));
        $flag=trim(I("flag"));
        $status=I("status",0,'intval');
        if($w){
            $where=" and  a.title  like '%{$w}%'";
        }
        if(in_array($flag,array_keys(C('artflag')))){
            $where=" and  FIND_IN_SET('{$flag}',a.flag)";
        }
        if(in_array($status,array('1','-1','-2'))){
            $where.=" and  a.status  ='{$status}'";
        }
        $count      = $art->table("st_art as a")->where("a.isdel=1   {$where}")->count(); // 查询满足要求的总记录数
        $Page       = new \Think\Page($count,20); // 实例化分页类 传入总记录数和每页显示的记录数(25)
        $show       = $Page->show(); // 分页显示输出
        $Page->setConfig('prev','«');
        $Page->setConfig('next','»');

        $re      = $art->table("st_art as a")->where("a.isdel=1  {$where}")->limit($Page->firstRow.','.$Page->listRows)->order("a.uptime desc")->select(); // 查询满足要求的总记录数
        $this->assign("art",$re);
        $this->assign("page",$show);


        $this->display();
    }

    public function add(){



        $cla=array(array("cid"=>166,'title'=>"默认分类"));
        $this->assign("cate",$cla);
        $this->assign("flag",C('artflag'));

        $this->display();
    }

    public function edit(){
        $aid=I("aid",0,"intval");
        if(!$aid){
            $this->error("非法操作");
        }

        $cate=array(array("cid"=>166,'title'=>"默认分类"));
        $this->assign('cate',$cate);

        $art=M()->table("st_art as a left join st_art_additional as b on a.aid=b.aid")->where("a.isdel=1 and a.aid={$aid}")->order("a.aid desc")->find();
        $tag=M()->table("st_art_tags as a ,st_tags as b")->where("b.isdel=1 and a.aid={$aid} and a.tid=b.tid")->select();
        $tags=implode(",",array_column($tag,'title'));
        $art['tags']=$tags;

        $this->assign("art",$art);
        $this->assign("flag",C('artflag'));

        $this->display("add");
    }

    public function addto(){

        $title=I("title");
        $cover=I("cover");
        $flag=I("flag");
        $desc=I("desc");
        $body=I("body");
        $cate=I("cate");

        $aid=I("aid",0,'intval');
        if(!$title || !$desc || !$cate ){
            $this->ajaxReturn(array("status"=>0,'msg'=>'参数丢失'));
        }
        if($aid){
            $w=" and aid!={$aid}";
        }
        $is=M("art")->where("title='{$title}' and isdel=1 $w ")->count();
        if($is){
            $this->ajaxReturn(array("status"=>0,'msg'=>'该标题已经存在'));
        }
        $add['title']=$title;

        $add['cover']=$cover;
        $add['desc']=$desc;
        $add['cid']=$cate;
        $add['status']=1;


        M()->startTrans();
        if($aid){
            $add['uptime']=time();
            $re=M("art")->where("isdel=1 and aid={$aid}")->save($add);
            $re1=M("art_additional")->where("aid={$aid}")->save(array('body'=>$body));
        }else{
            $add['click']=rand(20,1288);;

            $add['mid']=$this->memberinfo['uid'];
            $add['ctime']=time();
            $add['uptime']=$add['ctime'];
            $aid=$re=M("art")->add($add);
            $re1=M("art_additional")->add(array('aid'=>$aid,'body'=>$body));
        }

        if($re!==false && $re1!==false){
            M()->commit();
            $this->ajaxReturn(array("status"=>1,'msg'=>'操作成功'));
        }else{
            M()->rollback();
            $this->ajaxReturn(array("status"=>0,'msg'=>'操作失败'));
        }
    }




    /**
     * 删除
     *
     */
    public function del(){
        $aid=I("aid");
        if(!$aid && !is_array($aid)){
            $this->ajaxReturn(array("status"=>0,'msg'=>'参数丢失'));
        }
        foreach($aid as $k=>$v){
            if(!is_numeric($v)) unset($aid[$k]);
        }
        if(!$aid){$this->ajaxReturn(array("status"=>0,'msg'=>'参数丢失'));}
        M()->startTrans();
        $re=M("art")->where("aid in (".implode(',',$aid).")")->save(array("isdel"=>2));
        if($re!==false){
            M()->commit();
            $this->ajaxReturn(array("status"=>1,'msg'=>'操作成功'));
        }else{
            M()->rollback();
            $this->ajaxReturn(array("status"=>0,'msg'=>'操作失败'));
        }
    }
    
    /**
     *  sayHello
     */
    public function actionSay ($message = 'hello') {
        return $this->render('say', ['message' => $message]);
    }
    /**
     * 添加书籍
     */
    public function actionAddBook () {
        $model = new BookForm();
        if ($model->load(Yii::$app->request->post())) {
            // 验证 $model 收到的数据
            // 做些有意义的事 ...
            return $this->render('book', ['model' => $model]);
        } else {
            // 无论是初始化显示还是数据验证错误
            return $this->render('bookform', ['model' => $model]);
        }
    }
}
