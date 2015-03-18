/**
 * Created by jianglinjie on 15/2/6.
 */
define(function(){
    return {
        sortWay: function(a,b){
            return a - b;
        },
        exportUrl: function(){
            return require.toUrl('../css/base.css');
        }
    }
})