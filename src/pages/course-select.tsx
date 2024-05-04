import {
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import { Course } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import CmDialog from '@/components/CmDialog';
import CreateUserForm from '@/components/CreateUserForm';
import GameSetupLayout from '@/components/layouts/GameSetupLayout';
import { ButtonListItem } from '@/components/styledComponents';
import {
  AppPage,
  useAppPageContext,
} from '@/contexts/AppPageContext';

function CourseSelect() {
  const { setAppPage } = useAppPageContext();

  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

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
    // console.log('New Course selected');
    // setAppPage(AppPage.RULESET_SELECT);
  };

  return (
    <Box sx={{ position: 'relative' }}>
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
            onClick={() => undefined}
            aria-label="New Course"
            variant="outlined"
            size="large"
          >
            + New Course
          </Button>
        </ButtonListItem>
      </GameSetupLayout>
    </Box>

  );
}

export default CourseSelect;
