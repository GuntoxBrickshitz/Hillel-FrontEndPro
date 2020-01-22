'use strict';

const students = [ 
  new Student('Andrew', [9,7,7,6,8]),
  new Student('Brian', [10,10,9,10,9,10]),
  new Student('Carol', [8,9,7,8,6,7]),
  new Student('Diana', [10,9,10,10,10,10]),
  new Student('Edward', [7,8,8,7,6,4]),
  new Student('Fred', [10,10,8,10,3,4]),
  new Student('Gwen', [5,8,8,4,2,7]),
];

console.log(students[0].averageMark());
console.log(students[2].minMark());
console.log(students[4].maxMark());
console.log(averageGroupMark(students));
console.log(minGroupMark(students));
console.log(maxGroupMark(students));

function Student(name, grades) {
  this.name = name;
  this.grades = grades;
  this.getName = function () {
    return this.name;
  }
  this.averageMark = function () {
    const average = grades.reduce((sum, item) => sum + item, 0) / grades.length;    
    return average;
  }
  this.minMark = function () {
    const minGrade = grades.reduce((min, item) => (item < min) ? item : min);
    return minGrade;
  }
  this.maxMark = function () {
    const maxGrade = grades.reduce((max, item) => (item > max) ? item : max);
    return maxGrade;
  }
}

function averageGroupMark(group) {
  const average = group.reduce((sum, item) => sum + item.averageMark(), 0) / group.length;    
  return average.toFixed(2);
}

function minGroupMark(group) {
  const firstMinMark = group[0].minMark();
  const groupMinMark = group.reduce(
    (min, item) => {
      const studentMinMark = item.minMark();
      return (studentMinMark < min) ? studentMinMark : min;
    },
    firstMinMark);
  return groupMinMark;
}

function maxGroupMark(group) {
  const firstMaxMark = group[0].maxMark();
  const groupMaxMark = group.reduce(
    (max, item) => {
      const studentMaxMark = item.maxMark();
      return (studentMaxMark > max) ? studentMaxMark : max;
    },
    firstMaxMark);
  return groupMaxMark;
}