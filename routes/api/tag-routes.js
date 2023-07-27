const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // including its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [ { model: Product, through: ProductTag, as: 'products' }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // including its associated Product data
  try {
    const idData = await Tag.findByPk(req.params.id, {
      include: [ { model: Product, through: ProductTag, as: 'products' } ]
    });

    if (!idData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(idData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      "tag_name": "vintage"
    }
  */
    try {
      const postTagData = await Tag.create(
        { tag_name: req.body.tag_name,}
        );
      res.status(200).json(postTagData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const upTagData = await Tag.update(
    { tag_name: req.body.tag_name },
    { where: { id: req.params.id } }
    );
    res.status(200).json(upTagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTagData = await Tag.destroy(
      { 
        where: {
        id: req.params.id
      }
    });
    
    if (!delTagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(delTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
