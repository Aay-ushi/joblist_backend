
var express=require('express'),
// cons=require('consolidate'),

yargs=require('yargs'),
hbs=require('hbs'); 


var app=express();

//DB Connection String
// var connect="postgres://abc:root@localhost/demo"; (.evn file)

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname +'/views/partials');


const { Pool }=require('pg');



app.get('/getData',async (req,res)=>{
console.log('Server Working successfully');
// var date=To_Date(19/06/2019,dd/mm/yyyy);"

let data = await getData();   (
    
console.log("----------------"+data))

return res.json(data);
})

const getData = async function(){
return new  Promise((resolve,reject)=>{
    var querystatement=`select public."vacancies"."Id",public."vacancies"."PrimarySkills",public."vacancies"."PostedOn",public."vacancies"."status",public."vacancies"."Experience",public."vacancies"."JobDescriptionLink",public."JobRole"."JobRole",public."BusinessUnit"."BusinessUnitName",public."Location"."Name" from (((public."vacancies" INNER JOIN public."JobRole" ON public."vacancies"."JobRoleId"=public."JobRole"."Id") INNER JOIN public."BusinessUnit" ON public."vacancies"."BusinessUnitId"=public."BusinessUnit"."Id") INNER JOIN public."Location" ON public."vacancies"."LocationId"=public."Location"."Id")`;

    var config={
        user:'postgres',
        database: 'project',
        password:'root',
        host: 'localhost',
        port: '5432',
    };
    
    const pool=new Pool(config);
    pool.on('error',function(err,client){
        console.error('idle client error',err.message,err.stack);
    });
    pool.query(querystatement ,(err,res)=>{
        if(err) {
            console.error('error running query', err);
            resolve ({data:false});
        }
         console.log('Query successful');
         for (var i = 0; i < res.rowCount; i++) {
            var row = res.rows[i];
            Id=row.Id;
            Experience=row.BusinessUnitName;
            console.log(Id+" "+Experience);
        
        }
        resolve({data:res.rows});
    });

})

// return  data;

}
app.listen(3000,()=>{
console.log('server started');
});
