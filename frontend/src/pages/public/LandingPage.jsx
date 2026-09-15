import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useNavigate } from 'react-router-dom'

export function LandingPage() {
    const navigate = useNavigate()
    return(
        <>
            <section className="bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
                <div className="max-w-7xl mx-auto py-16 sm:py-24 lg:py-32">
                    <div className="grid lg:grid-cols-2 px-4 sm:px-8 lg:px-10 gap-12">
                        <div className="space-y-8 sm:space-y-10">
                            <h2 className="text-5xl font-bold font-serif">Twoja dieta pod kontrolą</h2>
                            <p className='text-gray-500'>Aplikacja, która pozwoli Ci zadbać o własną dięte, zoptymalizuje Twoje zakupy, jak i również pozwoli przygotować przepyszne dania. 
                                Wszystko to, a nawet więcej znajdziesz w aplikacji DietApp</p>
                            <button className="border rounded-md bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600" onClick={()=> navigate("/login")}>Zaloguj się</button>
                        </div>
                        <div className="flex">
                            <img className="rounded-lg shadow-xl" src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Healthy food"/>
                        </div>
                    </div>
                    
                </div>
            </section>
            <section className="py-16 bg-white sm:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-14 sm:mb-18">
                        <h3 className="font-bold font-serif text-3xl mb-4">Wszystko czego potrzebujesz</h3>
                        <p className="text-gray-500">Dietapp to wszechstronne narzędzie, które usprawni Twoje planowanie i zarządzanie</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div className="border border-gray-200 rounded-xl transition-shadow p-6 hover:shadow-lg">
                            <div className="flex items-center justify-center mb-4 bg-emerald-100 w-12 h-12 rounded-xl">
                                <CalendarMonthOutlinedIcon/>
                            </div>
                            <h5 className="text-xl font-bold font-serif mb-3">Kalendarz diety</h5>
                            <p className="text-gray-500">Planuj swoje posiłki na dni, tygodnie i miesiące z intuicyjnym kalendarzem.</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl transition-shadow p-6 hover:shadow-lg">
                            <div className="flex items-center justify-center mb-4 bg-emerald-100 w-12 h-12 rounded-xl">
                                <CalendarMonthOutlinedIcon/>
                            </div>
                            <h5 className="text-xl font-bold font-serif mb-3">Baza przepisów</h5>
                            <p className="text-gray-500">Dostęp do setek zdrowych przepisów z automatycznym obliczaniem wartości odżywczych</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl transition-shadow p-6 hover:shadow-lg">
                            <div className="flex items-center justify-center mb-4 bg-emerald-100 w-12 h-12 rounded-xl">
                                <CalendarMonthOutlinedIcon/>
                            </div>
                            <h5 className="text-xl font-bold font-serif mb-3">Lista zakupów</h5>
                            <p className="text-gray-500">Generuj listę zakupów na podstawie swojego planu żywieniowego i eksportuj do PDF.</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl transition-shadow p-6 hover:shadow-lg">
                            <div className="flex items-center justify-center mb-4 bg-emerald-100 w-12 h-12 rounded-xl">
                                <CalendarMonthOutlinedIcon/>
                            </div>
                            <h5 className="text-xl font-bold font-serif mb-3">Lista produktów</h5>
                            <p className="text-gray-500">Twórz własną bazę produktów z pełnymi wartościami odżywczymi.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
                <div className="max-w-7xl mx-auto py-16 sm:py-24 lg:py-32">
                    <div className="grid lg:grid-cols-2 px-4 sm:px-8 lg:px-10 gap-12">
                        <div className="space-y-8 sm:space-y-10">
                            <h2 className="text-5xl font-bold font-serif">Wybierz DietApp</h2>
                            <p className='text-gray-500'>Aplikacja, która pozwoli Ci zadbać o własną dięte, zoptymalizuje Twoje zakupy, jak i również pozwoli przygotować przepyszne dania. 
                                Wszystko to, a nawet więcej znajdziesz w aplikacji DietApp</p>
                            <div className="grid lg:grid-cols-2 px-4 gap-4">
                                <div className='flex items-start gap-2'>
                                    <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-600" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                                    </div>
                                    <span className='text-gray-600'>Pełna personalizacja diety</span>
                                </div>
                                <div className='flex items-start gap-2'>
                                    <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-600" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                                    </div>
                                    <span className='text-gray-600'>Eksport listy zakupów do PDF</span>
                                </div>
                                <div className='flex items-start gap-2'>
                                    <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-600" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                                    </div>
                                    <span className='text-gray-600'>Podsumowanie kaloryczności</span>
                                </div>
                                <div className='flex items-start gap-2'>
                                    <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-600" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
                                    </div>
                                    <span className='text-gray-600'>Wygenerowana dieta przez specjaliste</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <img className="rounded-lg shadow-xl" src="https://images.unsplash.com/photo-1636654931290-418d20865e03?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Healthy food"/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gradient-to-br from-emerald-400 to-green-500">
                <div className="max-w-7xl mx-auto text-center text-white">
                    <h4 className='font-bold font-serif m-4 text-3xl'>Zacznij planować swoja diete</h4>
                    <p className='mb-6'>Dołącz do tysięcy użytkowników, którzy już kontrolują swoje żywienie</p>
                    <button className="border rounded-md bg-white px-4 py-2 font-semibold text-green-500 hover:bg-gray-200" onClick={()=> navigate("/login")}>Zaloguj się</button>
                </div>
            </section>
        </>
    )

    
}