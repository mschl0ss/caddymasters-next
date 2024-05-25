import {
  Box,
  Button,
  CircularProgress,
  Slide,
  SxProps,
} from '@mui/material';
import { Course } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import CourseForm from '@/components/course-details/CourseForm';
import GameSetupLayout from '@/components/layouts/GameSetupLayout';
import { ButtonListItem } from '@/components/styledComponents';
import {
  AppPage,
  useAppPageContext,
} from '@/contexts/AppPageContext';

function CourseSelect() {
  const { setAppPage } = useAppPageContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const wrapperRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    async function fetcher() {
      setIsLoading(true);
      const { data: { courses: courseData } }: AxiosResponse<{ courses: Course[] }> = await axios.get('http://localhost:3000/api/courses');
      setCourses(courseData);
      setIsLoading(false);
    }
    fetcher();
  }, []);

  useEffect(() => { console.log('courses ', courses); }, [courses]);
  const handleButtonClick = () => {
    setAppPage(AppPage.RULESET_SELECT);
  };
  const handleNewCourseClick = () => {
    setIsDrawerOpen(true);
  };

  const collapseSx: SxProps = {
    position: 'absolute',
    bottom: 0,
    // borderRadius: '25px',
    height: '100%',
    width: '100%',
    background: 'white',
  };

  const wrapperSx = {
    position: 'relative',
    height: 'calc(100% - 64px)',
    borderRadius: '0 0 25px 25px',
    overflow: 'hidden',
  };

  return (
    <Box sx={wrapperSx} ref={wrapperRef}>
      <GameSetupLayout>
        {isLoading ? <CircularProgress /> : courses.map((course) => (
          <ButtonListItem key={course.name}>
            <Button
              onClick={handleButtonClick}
              aria-label={course.name}
              variant="contained"
              size="large"
            >
              {course.name}
            </Button>
          </ButtonListItem>
        ))}
        <ButtonListItem>
          <Button
            onClick={handleNewCourseClick}
            aria-label="New Course"
            variant="outlined"
            size="large"
          >
            + New Course
          </Button>
        </ButtonListItem>
      </GameSetupLayout>
      <Slide
        direction="up"
        container={wrapperRef.current}
        in={isDrawerOpen}
        timeout={500}
      >
        <Box sx={collapseSx}>
          <CourseForm openAsForm onClose={() => setIsDrawerOpen(false)} />
        </Box>
      </Slide>
    </Box>

  );
}

export default CourseSelect;
