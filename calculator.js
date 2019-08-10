/** * @param {string} s * @return {number} */
var calculate = function(s) {
    s = s.replace(new RegExp(" ","g"),"");
    var len = s.length;
    if(len===0){
        return 0;
    }
    var stack = [];
    var ret = 0;
    var sign = 1;
    var isMul = 0;
    for(var i=0;i<len;i++){
        var n = s.charAt(i);
        if (!isNaN(parseInt(n))){
            var cur = parseInt(n);
            while(i+1<len && (!isNaN(parseInt(s.charAt(i+1))))){
                cur = 10*cur + parseInt(s.charAt(++i));  
            }
            if(s.charAt(i+1)=="+"||s.charAt(i+1)=="-"||s.charAt(i+1)===""){
                if(stack.length===0){
                    ret += sign*cur;
                }else{
                    if(isMul==1){
                        cur = cur*stack.pop();
                    }else if(isMul==-1){
                        cur = Math.floor(stack.pop()/cur);
                    }
                    s_sign = stack.pop();
                    s_ret = stack.pop();
                    ret = s_ret+s_sign*cur;
                    isMul = 0;
                }
            }else if(s.charAt(i+1)=="*"||s.charAt(i+1)=="/"){
                if(isMul===0){
                    stack.push(ret);
                    stack.push(sign);
                    stack.push(cur);
                    ret = 0;
                    sigh = 1;
                }else{  // 3+8*9/3
                    if(isMul==1){
                        cur = cur*stack.pop();
                        stack.push(cur);
                    }else if(isMul==-1){
                        cur = Math.floor(stack.pop()/cur);
                        stack.push(cur);
                    }
                }
            }
        }else if(n=="+"){
            sign = 1;
            isMul = 0;
        }else if(n=="-"){
            sign = -1;
            isMul = 0;
        }else if(n=="*"){
            isMul = 1;
        }else if(n=="/"){
            isMul = -1;
        }
    }
    return ret;

};