/* -------------------------------------------------------------
    @ 名称：H5见缝插针小游戏
    @ 版本：v1.0
    @ 作者：cici
    @ 时间：2017/02/15
*/
var tar = $(".tar"),    
    btn = $(".ty,.shaozi"),  
    arrowIndex = 1,  
    rotateNum = 0,   
    arrPos = [],     
    safeDistance = 17,  
    score = 0,         
    ts = null
    flag = true,
    arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],    
    rand = -1,    
    time_minute = 0,
    time_second = 0,
    time = 0,
    gt = null;


//开始游戏
start();


//发射
btn.live('tap', function() {
    getData();
    var src = parseInt($('.ty').attr('data-id'))-1;
    if(flag){   
        flag = false;   
        $('.ty').addClass('shortLon');   
        setTimeout(function(){                
            shootArrow(arrowIndex, 'images/tt'+src+'.jpg');
            arrowIndex++;                
        }, 300)   
    }else{
        console.log("您老慢点，球受不了啦");
    }
});


function start(){
    flag = true;
    $('.hand').removeClass('handdot').hide();
    getData();
    ts = setInterval(rotate,30);
    times();
}

//旋转
function rotate() {
    tar.css({"-webkit-transform": "rotate(" + rotateNum + "deg)", "transform": "rotate(" + rotateNum + "deg)"});
    rotateNum = (rotateNum>=360)?0:rotateNum+1;
};

//进球
function shootArrow(i, src) {
    var newPos=-1*(rotateNum-90);
    arrPos.push(newPos);
    var arrowDiv = "<div class='item item" + i + "'><img src='"+src+"' class='zoomIn' /></div>";
    tar.append(arrowDiv);
    $(".item" + i).css({'-webkit-transform': "rotate("+newPos+"deg)", 'transform': "rotate("+newPos+"deg)"});
    var arrFilter = $.grep(arrPos, function(n, i) {
        return (Math.abs(n-newPos) < safeDistance);
    });
    //失败
    if (arrFilter.length >= 2) {
        console.log("失败！你共获得"+score+"分");
        flag = false;
        clearInterval(ts);
        ts = null;
        clearInterval(gt);
        gt = null;

        $('.tk').hide();
        $('.tk-err').show();
    }else{
        score++;
        flag = true;
        $('.tyNum').text(score>18?18:score);

        if(score>=18){ 
            //成功
            console.log('成功啦！')
            clearInterval(ts);
            ts = null;
            clearInterval(gt);
            gt = null;
            time = Number(time_minute)*60 + Number(time_second);

            $('.tk').hide();
            $('.tk-suc').show();
            $('.tsTime').text(time);
        }
    };
};

function getData(){        
    rand++;
    if(rand<18){
        $('.ty').remove();
        $('.game').append('<img data-id="'+(rand+1)+'" src="images/tt'+arr[rand]+'.jpg" class="pa ty" id="ty" />')
    }else{
        $('.ty').attr('data-id', 19);
    }
}

function times(){
    gt = setInterval(function(){
        time_second++;
        if(time_second>=60){
            time_minute++;
            time_second = time_second%60;
        }
        if(time_minute>=30){
            alert('哎哟，您太慢了。重新开始吧！');
            location.reload();
        }
        $('.ts1').text(time_minute<10?'0'+time_minute:time_minute);
        $('.ts2').text(time_second<10?'0'+time_second:time_second);
    }, 1000)
}


//重玩
$('.restartBtn').on('tap', function(){
    $('.tk').hide();
    $('.item,.ty').remove();
    //$('.game').append('<img data-id="1" src="images/tt1.jpg" class="pa ty" id="ty" />')

    arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    arrPos.length = 0;
    arrowIndex = 1,  
    rotateNum = 0,  
    score = 0;      
    rand = -1;
    flag = true;
    time_minute = 0;
    time_second = 0;
    time = 0;

    $('.tyNum').text(0);
    $('.ts1,.ts2').text('00');

    getData();
    times();
    ts = setInterval(rotate,30);
})

