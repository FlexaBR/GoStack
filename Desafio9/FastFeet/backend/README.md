dev mode

cd /backend:
terminal 1: yarn dev
terminal 2: yarn queue    => jobs

yarn sequelize db:migrate
yarn sequelize db:seed:all

yarn sequelize db:migrate:undo:all
