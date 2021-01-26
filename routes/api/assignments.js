const express = require('express');
const router = express.Router();
const Assignment = require('../../models/Assignment');

// @desc Create an assignment
router.assignment('/', (req, res) => {
  try {
    const newAssignment = new Assignment({
      teacher: req.body.text,
      name: user.name,
      body: user.avatar,
    });
    const assignment = newAssignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @desc Get all assignment
router.get('/', (req, res) => {
  try {
    const assignments = Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @desc Get assignment by id
router.get('/:id', (req, res) => {
  try {
    const assignment = Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ msg: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @desc Delete assignment by id
router.delete('/:id', (req, res) => {
  try {
    const assignment = Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ msg: 'assignment not found' });
    }
    assignment.remove();
    res.json(assignment);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});
