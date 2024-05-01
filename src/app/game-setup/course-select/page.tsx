'use client';

import { Button } from '@mui/material';

import { ButtonListItem } from '@/app/game-setup/styledComponents';
import {
  AppPage,
  useAppPageContext,
} from '@/contexts/AppPageContext';
import { Course } from '@/utils/types';

export default function CourseSelect() {
  const { setAppPage } = useAppPageContext();

  const handleButtonClick = (course: Course) => {
    console.log(`${course.name} selected`);
    setAppPage(AppPage.RULESET_SELECT);
  };

  const courses: Course[] = [...Array(12).keys()].map((i) => ({ id: i, name: `Game ${i}` }));

  const handleNewCourseClick = () => {
    console.log('New Course selected');
    setAppPage(AppPage.RULESET_SELECT);
  };

  const courseButtons = courses.map((course) => (
    <ButtonListItem key={course.name}>
      <Button
        onClick={() => handleButtonClick(course)}
        aria-label={course.name}
        variant="contained"
        size="large"
      >
        {course.name}
      </Button>
    </ButtonListItem>
  ));

  return (
    <>
      {courseButtons}
      <ButtonListItem>
        <Button
          onClick={() => handleNewCourseClick()}
          aria-label="New Course"
          variant="outlined"
          size="large"
        >
          + New Course
        </Button>
      </ButtonListItem>
    </>
  );
}
