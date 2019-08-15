//事件监听器

var EventHandlerUtil ={
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },

    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);

        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    }
};

//公用变量初始化，n1为计算数，n2为暂存数和结果
var n1 = null;
var n2 = null;
var sign = null;

var tempNumber = [];
var haveDot = false;
var isPositive = true;

//按钮DOM引用
var elementNums = document.getElementById("nums");
var elementSpecs=document.getElementById("specs");

//处理点和数字
EventHandlerUtil.addHandler(elementNums, 'click', function(e) {
            var target = e.target ? e.target : window.event.srcElement;
            if (target.tagName === "LI") {
                var targetValue = target.innerHTML;
                if (targetValue === "." && !haveDot) {
                     if(n1==null&&n2!=null)//从n2的结果输入点，要先置换成n1数组
                    {
                        n1=n2;
                        n2=null;
                        tempNumber=n1.toString().split('');
                    }
                    tempNumber.push(".");
                    haveDot = true;

                } else if (targetValue === "." && haveDot) {
                    if(n1==null&&n2!=null)//从n2的结果输入点，要先置换成n1数组
                    {
                        n1=n2;
                        n2=null;
                        tempNumber=n1.toString().split('');
                    }
                    return false;

                } else {
                    tempNumber.push(targetValue);

                }

                 setN1(tempNumber);
               
            }


        });

//给array添加 是否包含某字符的 方法
Array.prototype.contains = function(val)  
{  
     for (var i = 0; i < this.length; i++)  
    {  
       if (this[i] == val)  
      {  
       return true;  
      }  
    }  
     return false;  
};  

function reset(){
    tempNumber=[];
     n1=null;
    haveDot=false;
    isPositive = true;
}

//处理正负号、清零和百分号
EventHandlerUtil.addHandler(elementSpecs, 'click', function(e) {
var target = e.target ? e.target : window.event.srcElement;

 if (target.tagName === "LI") {
                var targetValue = target.innerHTML;
                    if (targetValue === "+/-" && isPositive) {
                    if(n1==null&&n2!=null)//从n2的结果输入正负号，要先置换成n1数组
                    {
                        n1=n2;
                        n2=null;
                        tempNumber=n1.toString().split('');
                    }
                    tempNumber.unshift("-");
                    isPositive = false;

                } else if (targetValue === "+/-" && !isPositive) {
                     if(n1==null&&n2!=null)//从n2的结果输入正负号，要先置换成n1数组
                    {
                        n1=n2;
                        n2=null;
                        tempNumber=n1.toString().split('');
                    }
                    tempNumber.shift();
                    isPositive = true;

                } else if (targetValue ==="AC"){
                    reset();
                    n2=null;
                } else {
                     if(n1==null&&n2!=null)//从n2的结果输入百分号，要先置换成n1数组
                    {
                        n1=n2;
                        n2=null;
                        tempNumber=n1.toString().split('');
                    }

                    setN1(tempNumber);
                    n1=n1/100;
                    tempNumber=n1.toString().split('');
                    if(tempNumber.contains('.')){
                        haveDot=true;
                    }

                }
            

                
                setN1(tempNumber);

                }


        });

//将字符转换为n1
function setN1(arg){
    var temp=arg.join('');
    if(!isNaN(parseFloat(temp)))
    {
        n1=parseFloat(temp);
        show(tempNumber);
    }
    else
    {
        n1=null;
        show(0);
    }
}

//显示输入字符
function show(arg){
    var display=document.getElementById("result");

    if(arg.length<6||arg.toString().length<6)//根据数位调整显示大小
    {
        display.style.fontSize="70px";
    }
    else
    {
        display.style.fontSize="50px";
    }

    //显示数组或数字

    if(Array.isArray(arg))
    {
        display.innerHTML=parseFloat(arg.join(''));
    }
    else if(!isNaN(arg))
    {
        display.innerHTML=parseFloat(parseFloat(arg).toFixed(6));

    }else
    {
        display.innerHTML=arg;
    }
}


//添加计算方法
var elementSigns = document.getElementById("signs");

EventHandlerUtil.addHandler(elementSigns, 'click', function(e) {
        var target = e.target ? e.target : window.event.srcElement;

            if (target.tagName === "LI") {
                var targetValue = target.innerHTML;

                    if (targetValue.match(/[\+\-x÷]/)){
                    calculate();
                    sign=targetValue;

                }
                else
                {
                    calculate();
                }
            }

        });

function calculate(){
    if(n2===null){
        n2=n1;
        n1=null;
        reset();
    }
    else{
        switch(sign){
            case '+':
            n2+=n1;
            reset();
            show(n2);
            tempNumber=n2.toString().split('');
            setN1(tempNumber);
            sign=null;
            n2=null;
            break;

            case '-':
            n2-=n1;
            reset();
            show(n2);
            tempNumber=n2.toString().split('');
            setN1(tempNumber);
            sign=null;
            n2=null;
            break;

            case 'x':
            if(n1!==null){
                n2*=n1;
            reset();
            show(n2);
            tempNumber=n2.toString().split('');
            setN1(tempNumber);
            sign=null;
            n2=null;
        }
            break;
            case '÷':

             if(n1===0){
                show("ERROR0");
             }
             else if(n1!==0)
             {

                n2/=n1;
            reset();
            show(n2);
            tempNumber=n2.toString().split('');
            setN1(tempNumber);
            sign=null;
            n2=null;
        }

            break;

            default:
            console.log("");
                      
        }
    }
}
