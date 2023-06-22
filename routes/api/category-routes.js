const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [ { model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const idData = await Category.findByPk(req.params.id, {
      include: [ { model: Product } ]
    });

    if (!idData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(idData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const postCategoryData = await Category.create({ category_name: req.body.category_name,});
    res.status(200).json(postCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const upCategoryData = await Category.update(
    { category_name: req.body.category_name },
    { where: { id: req.params.id } }
    );
    res.status(200).json(upCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if (!delCategoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(delCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
