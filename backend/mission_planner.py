from mavsdk.mission import MissionItem, MissionPlan


"""
example output from front end of boundaries:
[
    { "lat": 44.564418218107924, "lng": -123.27884397156114 }, 
    { "lat": 44.56441439616401, "lng": -123.2792677605855 }, 
    {"lat": 44.56422712060508, "lng": -123.27888152248735 }, 
    { "lat": 44.56422329864859, "lng": -123.27925703174944 }, 
    { "lat": 44.56441439616401, "lng": -123.2792677605855 } 
]
-> this is a rectangle where the first and last points are the same
"""

def generate_mission_plan(boundaries, altitude=5, speed=5, is_fly_through=True, loiter_time=float("nan"), vehicle_action=MissionItem.VehicleAction.NONE):
    """
    Generates a mission from the given boundaries and parameters
    inputs:
    - boundaries: list of dictionaries, each containing a lat and lng key
    - altitude: float, the altitude of the mission
    - speed: float, the speed of the mission
    - is_fly_through: boolean, whether the drone should fly through the waypoints
    - loiter_time: float, the time to loiter at each waypoint
    - vehicle_action: MissionItem.VehicleAction, the action to take at each waypoint
    """

    mission_items = []

    for i in range(len(boundaries)):
        mission_items.append(
            MissionItem(
                boundaries[i]["lat"],
                boundaries[i]["lng"],
                altitude,
                speed,
                is_fly_through, 
                float("nan"), 
                float("nan"), 
                MissionItem.CameraAction.NONE, 
                float("nan"), 
                float("nan"), 
                float("nan"), 
                float("nan"), 
                loiter_time, 
                vehicle_action
            )
        )

    return MissionPlan(mission_items)


if __name__ == "__main__":
    example_points = [ # this is the example from mavsdk. should correspond to europe
        {"lat": 47.3980398, "lng": 8.5455725},         
        {"lat": 47.3980362, "lng": 8.54501464}, 
        {"lat": 47.3978256, "lng": 8.54500928}
        ]
    mission_plan = generate_mission_plan(example_points)
    print(mission_plan)

