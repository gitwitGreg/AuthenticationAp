const express = require('express');

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ewmlbtuoknunmdychans.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


const app = express();

app.listen(5002, ()=> {
    console.log('Server starrted on  port 5002')
});


db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('My sql connected')
    }
});
