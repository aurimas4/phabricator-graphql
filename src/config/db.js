import Sequelize from 'sequelize';

const {
    PHABRICATOR_DB_HOST,
    PHABRICATOR_DB_USER,
    PHABRICATOR_DB_PASS,
} = process.env;

export const userDb = new Sequelize('phabricator_user', PHABRICATOR_DB_USER, PHABRICATOR_DB_PASS, {
    host: PHABRICATOR_DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});
userDb.dialect.supports.schemas = true;

export const diffDb = new Sequelize('phabricator_differential', PHABRICATOR_DB_USER, PHABRICATOR_DB_PASS, {
    host: PHABRICATOR_DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});
diffDb.dialect.supports.schemas = true;

const User = userDb.define('user', {
    phid: Sequelize.STRING,
    userName: Sequelize.STRING,
    realName: Sequelize.STRING,
}, {
    schema: 'phabricator_user',
    timestamps: false,
    paranoid: false,
    tableName: 'user',
});

const Diff = diffDb.define('diff', {
    phid: Sequelize.STRING,
    dateCreated: Sequelize.INTEGER,
    dateModified: Sequelize.INTEGER,
    authorPHID: Sequelize.STRING,
}, {
    schema: 'phabricator_differential',
    timestamps: false,
    paranoid: false,
    tableName: 'differential_diff',
});

const Revision = diffDb.define('revision', {
    title: Sequelize.STRING,
    phid: Sequelize.STRING,
    status: Sequelize.STRING,
    dateCreated: Sequelize.INTEGER,
    dateModified: Sequelize.INTEGER,
    authorPHID: Sequelize.STRING,
    activeDiffPHID: Sequelize.STRING,
}, {
    schema: 'phabricator_differential',
    timestamps: false,
    paranoid: false,
    tableName: 'differential_revision',
});

const Transaction = diffDb.define('transaction', {
    phid: Sequelize.STRING,
    authorPHID: Sequelize.STRING,
    objectPHID: Sequelize.STRING,
    transactionType: Sequelize.STRING,
    oldValue: Sequelize.STRING,
    newValue: Sequelize.STRING,
    dateCreated: Sequelize.INTEGER,
    dateModified: Sequelize.INTEGER,
}, {
    schema: 'phabricator_differential',
    timestamps: false,
    paranoid: false,
    tableName: 'differential_transaction',
});


User.Diffs = User.hasMany(Diff, {
    as: 'diffs',
    foreignKey: 'authorPHID',
    sourceKey: 'phid'
});

Diff.User = Diff.belongsTo(User, {
    through: User,
    as: 'user',
    foreignKey: 'authorPHID',
    targetKey: 'phid'
});


User.Revisions = User.hasMany(Revision, {
    as: 'revisions',
    foreignKey: 'authorPHID',
    sourceKey: 'phid'
});

Revision.User = Revision.belongsTo(User, {
    through: User,
    as: 'user',
    foreignKey: 'authorPHID',
    targetKey: 'phid'
});


User.Transactions = User.hasMany(Transaction, {
    as: 'transactions',
    foreignKey: 'authorPHID',
    sourceKey: 'phid',
});

Transaction.User = Transaction.belongsTo(User, {
    through: User,
    as: 'user',
    foreignKey: 'authorPHID',
    targetKey: 'phid'
});


Revision.Transactions = Revision.hasMany(Transaction, {
    as: 'transactions',
    foreignKey: 'objectPHID',
    sourceKey: 'phid',
});

Transaction.Revision = Transaction.belongsTo(Revision, {
    through: Revision,
    as: 'revision',
    foreignKey: 'objectPHID',
    sourceKey: 'phid',
});


Revision.Diffs = Revision.hasMany(Diff, {
    as: 'diffs',
    foreignKey: 'revisionID',
    sourceKey: 'id',
});

Diff.belongsTo(Revision, {
    through: Revision,
    as: 'revision',
    foreignKey: 'revisionID',
    sourceKey: 'id',
});

export { Diff, User, Transaction, Revision };
