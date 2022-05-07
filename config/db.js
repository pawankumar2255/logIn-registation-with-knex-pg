const knex = require('knex')({
    client:"pg",
    connection:"postgres://pawank:navgurukul@localhost:5432/knex_pg_reg"
})


knex.schema.createTable('users',table=>{
    table.increments('id')
    table.string('name')
    table.string('email')
    table.string('password')
}).then(()=>{
    console.log('table created');
}).catch((err)=>{
    console.log(err.message);
})

module.exports = knex