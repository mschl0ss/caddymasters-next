import {
  Box,
  Button,
  CircularProgress,
  SwipeableDrawer,
} from '@mui/material';
import { Course } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import {
  useEffect,
  useState,
} from 'react';

import AppPageSetButton from '@/components/AppPageSetButton';
import GameSetupLayout from '@/components/layouts/GameSetupLayout';
import { ButtonListItem } from '@/components/styledComponents';
import { AppPage } from '@/contexts/AppPageContext';

function CourseSelect() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    async function fetcher() {
      setIsLoading(true);
      const { data: { courses: courseData } }: AxiosResponse<{ courses: Course[] }> = await axios.get('http://localhost:3000/api/courses');
      setCourses(courseData);
      setIsLoading(false);
    }
    fetcher();
  }, []);

  useEffect(() => { console.log('courses ', courses); }, [courses]);
  const handleNewCourseClick = () => {
    // console.log('New Course selected');
    // setAppPage(AppPage.RULESET_SELECT);
  };

  // const courseButtons = courses.map((course) => (
  //   <ButtonListItem key={course.name}>
  //     {/* <Button */}
  //     {/*  onClick={() => handleButtonClick(course)} */}
  //     {/*  aria-label={course.name} */}
  //     {/*  variant="contained" */}
  //     {/*  size="large" */}
  //     {/* > */}
  //     {/*  {course.name} */}
  //     {/* </Button> */}
  //     <AppPageSetButton label={course.name} appPage={AppPage.RULESET_SELECT} />
  //   </ButtonListItem>
  // ));

  const toggleDrawer = () => (event: KeyboardEvent | MouseEvent) => {
    if (
      event
        && event.type === 'keydown'
        && ((event as KeyboardEvent).key === 'Tab'
            || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <>
      <GameSetupLayout>
        {isLoading ? <CircularProgress /> : courses.map((course) => (
          <ButtonListItem key={course.name}>
            {/* <Button */}
            {/*  onClick={() => handleButtonClick(course)} */}
            {/*  aria-label={course.name} */}
            {/*  variant="contained" */}
            {/*  size="large" */}
            {/* > */}
            {/*  {course.name} */}
            {/* </Button> */}
            <AppPageSetButton label={course.name} appPage={AppPage.RULESET_SELECT} />
          </ButtonListItem>
        ))}
        <ButtonListItem>
          <Button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="New Course"
            variant="outlined"
            size="large"
          >
            + New Course
          </Button>
        </ButtonListItem>
      </GameSetupLayout>
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
      >
        <Box
          sx={{ width: 'auto' }}
          role="presentation"
          onClick={() => setIsDrawerOpen(false)}
          onKeyDown={() => setIsDrawerOpen(false)}
        >
          heyy
        </Box>
      </SwipeableDrawer>
    </>

  );
}

export default CourseSelect;
