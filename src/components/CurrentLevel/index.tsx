import {round} from "lodash";
import moment from "moment/moment";
import {LevelMeasurement} from "@/lib/level";

interface CurrentLevelProps {
    latest: LevelMeasurement;
}

const CurrentLevel = ({latest}: CurrentLevelProps) => (
    <div className="bg-blue-400 p-6 rounded-xl my-5">
        <h2 className="text-xl">Current Level: {latest.level} ft</h2>
        <p>{`${round(latest.level - 915, 2)} ft above full pool`}</p>
        <h2>
            Last Updated:{" "}
            {moment(latest.measuredAt).format("MMMM Do YYYY, h:mm:ss a")}
        </h2>
    </div>
);

export default CurrentLevel;