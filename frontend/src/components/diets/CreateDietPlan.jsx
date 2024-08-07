import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import SearchIcon from '@mui/icons-material/Search';
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export function CreateDietPlan() {
  const days = [
    { key: "1", label: "Day One" },
    { key: "2", label: "Day Two" },
    { key: "3", label: "Day Three" },
    { key: "4", label: "Day Four" },
    { key: "5", label: "Day Five" },
    { key: "6", label: "Day Six" },
    { key: "7", label: "Day Seven" }
  ];

  const meals = ["breakfast", "secondBreakfast", "lunch", "afternoonMeal", "dinner"];

  const [recipes, setRecipes] = useState({ "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [] });
  const [toggleModal, setToggleModal] = useState(false);
  const [toggledMeal, setToggledMeal] = useState("");
  const [recipesList, setRecipesList] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [formData, setFormData] = useState({ days: days.map(day => (
    { day: day.key, 
      breakfast: "", 
      second_breakfast: "", 
      lunch: "", 
      afternoon_meal: "", 
      dinner: "", 
      start_diet_date: '2023-10-01', 
      end_diet_date:'2023-10-05', 
      user: null })) });
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);


  const fetchRecipeList = useFetch("http://127.0.0.1:8000/api/recipes", "GET");
  const fetchUsersList = useFetch("http://127.0.0.1:8000/api/user/list", "GET");
  const fetchSendDiet = useFetch(`http://127.0.0.1:8000/api/diets/create-diet-plan/`, "POST", formData);

  useEffect(() => {
    fetchRecipeList()
      .then(res => res.json())
      .then(data => {
        setRecipesList(data);
      })
      .catch(error => console.error("Something went wrong with fetch recipes list ", error));
      // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchUsersList()
      .then(res => res.json())
      .then(data => {
        setUsersList(data);
      })
      .catch(error => console.error("Something went wrong with fetch users list ", error));
      // eslint-disable-next-line
  }, []);

  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    if (query === '') {
      setFilteredRecipes([]);
    } else {
      setFilteredRecipes(recipesList.filter(d => d.title.toLowerCase().startsWith(query)));
    }
  };

  const handleToggleModal = (mealType, day) => {
    setToggleModal(!toggleModal);
    setToggledMeal(mealType);
    setSelectedDay(day);
  }

  const applyRecipeToMeal = (recipe) => {
    if (selectedDay && toggledMeal) {
      setRecipes(prevRecipes => {
        const updatedDayRecipes = [...prevRecipes[selectedDay]];

        const mealIndex = meals.indexOf(toggledMeal);
        updatedDayRecipes[mealIndex] = recipe;
        return {
          ...prevRecipes,
          [selectedDay]: updatedDayRecipes
        };
      });

      setFormData(prevFormData => {
        const updatedDays = prevFormData.days.map(day => {
          if (day.day === selectedDay) {
            console.log(toggledMeal);
            return { ...day, [toggledMeal]: recipe.id}
          }
            return day;
        })
        return {...prevFormData, days: updatedDays };
      });

      setSelectedMeal(recipe.title);
      setToggleModal(false);
    }
  }

  const handleUserChange = (userId) => {
    setSelectedUser(userId);
    const newDaysData = formData.days.map(dayData => ({ ...dayData, user: userId }));
    setFormData({ ...formData, days: newDaysData });
  };

  return (
    <div className="flex flex-col w-full gap-4 h-full">
      <FormControl fullWidth>
        <InputLabel id="user-select">Users</InputLabel>
        <Select
          labelId="user"
          id="user-select"
          label="Users"
          value={selectedUser || ''}
          onChange={(e) => handleUserChange(e.target.value)}
        >
          {usersList.map((user, index) => (
            <MenuItem key={index} value={user.user_id}>{user.username}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="flex gap-2">
        {days.map((day, dayIndex) => (
          <div className="flex flex-col text-center gap-2 w-full h-calc-100vh-minus-4rem" key={dayIndex}>
            <div className="flex flex-col gap-2 h-full" >
              <span>{day.label}</span>
              {meals.map((meal, mealIndex) => (
                <>
                  <div className="flex flex-col justify-between text-center h-1/5 p-2 border-yellow-400 border-2" key={mealIndex}>
                    <span>{meal}</span>
                    <span>{recipes[day.key][mealIndex] && recipes[day.key][mealIndex].title}</span>
                    <Button variant="contained" color="success" id={`button ${mealIndex + 1}`} size="small" onClick={() => handleToggleModal(meal, day.key)} fullWidth>add Recipe</Button>
                  </div>
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button variant="contained" color="primary" onClick={fetchSendDiet}>Send Plan</Button>
      {toggleModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex p-5 border-b border-solid border-blueGray-200 rounded-t w-full justify-center">
                  <h3 className="text-3xl font-semibold">
                    Choose {toggledMeal}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative pb-10 ps-10 pe-10 pt-4 flex-auto">
                  <div className="flex flex-col gap-1 h-64">
                    <TextField sx={{ marginTop: 2 }} size="small" variant="outlined" label="Recipes" id="recipes" onChange={handleFilter} fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }} />
                    <div className="relative justify-around">
                      <ul className="absolute w-full rounded-b-lg bg-slate-100">
                        {filteredRecipes.map((item, index) => {
                          return (
                            <li className="border-b-[1px] border-cyan-600 p-2 hover:bg-indigo-200 z-20" key={index} onClick={() => applyRecipeToMeal(item)}>{item.title}</li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
