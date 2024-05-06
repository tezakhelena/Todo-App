import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatus } from "../../redux/ZadaciSlice";
import ZadaciPage from "../pages/SviZadaci";
import { RootState } from "../../redux/store";
import { dodajNotifikaciju } from "../../redux/NotifikacijeSlice";
import { formatDate } from "../../utils/HelperFunctions";
import moment, { Moment } from "moment";

const ZadaciPageContainer = () => {
    const dispatch = useDispatch();
    const zadaci = useSelector((state: RootState) => state.tasks);


    const [checkedTasks, setCheckedTasks] = useState<number[]>([]);
    const [selectedTaskId, setSelectedTaskId] = useState<number>(0);

    const [details, setDetails] = useState(false);

    const openDetailsZadatak = (taskId: number) => {
        setSelectedTaskId(taskId);
        setDetails(true);
    }

    const closeDetailsZadatak = () => {
        setSelectedTaskId(0);
        setDetails(false);
    }


    const handleCheckBoxChange = (taskId: number) => {
        if (checkedTasks.includes(taskId)) {
            setCheckedTasks(checkedTasks.filter((id) => id !== taskId));
        } else {
            setCheckedTasks([...checkedTasks, taskId]);
        }
    };

    const provjeraButton = checkedTasks.length > 0;

    const markTasksAsCompleted = (taskIds: number[]) => {
        taskIds.forEach((taskId) => {
            dispatch(updateTaskStatus({ taskId, status: 'dovrseno' }));
        });
    };

    const handleDovrsiZadatke = () => {
        markTasksAsCompleted(checkedTasks);
        setCheckedTasks([]);
    };

    return (
        <ZadaciPage
            handleDovrsiZadatke={handleDovrsiZadatke}
            openDetailsZadatak={openDetailsZadatak}
            details={details}
            selectedTaskId={selectedTaskId}
            provjeraButton={provjeraButton}
            handleCheckBoxChange={handleCheckBoxChange}
            checkedTasks={checkedTasks}
            closeDetailsZadatak={closeDetailsZadatak}
        />
    );
}

export default ZadaciPageContainer;