const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
    .then(accounts => {
        res.json(accounts)
    })
    .catch(error => {
        res.status(500).json({message: 'Failed to get account'});
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({ id })
    .then(posts => {
        const account = accounts[0];
    if (account) {
        res.json(account);
    } else {
        res.status(404).json({message: 'Invalid post id'});
    }
    })
    .catch(error => {
        res.status(500).json({message: 'Failed to get account'});
    });
});

router.post('/', (req, res) => {
    const accountData = req.body;

    db('accounts').insert(accountData)
    .then(ids => {
        res.status(201).json({newAccountId: ids[0]});
    })
    .catch(error => {
        console.log()
        res.status(500).json({message: 'Failed to insert account'});
    })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('accounts').where({ id }).update(changes)
    .then(count => {
        if (count) {
            res.json({ updated: count});
        } else {
            res.status(404).json({message: 'Invaled account id'});
        }
    })
    .catch(error => {
        res.status(500).json({message: 'Failed to update account '});
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({ id }).del()
    .then(count => {
        if (count) {
            res.json({deleted: count })
        } else {
            res.status(404).json({message: 'Invalid account id '})
        }
    })
    .catch(error => {
        res.status(500).json({message: 'Failed to delete account'})
    });
});

module.exports = router;