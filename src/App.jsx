import Navbar from "./components/navbar"
import Menu from "./components/Menu"

function App() {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,#1e1814,#000)] text-white font-['Outfit']">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
                
                {/* Welcome Section */}
                <div className="text-center mb-20 lg:mb-32">
                    <h1 className="font-['Playfair_Display'] text-6xl lg:text-8xl font-bold tracking-tighter mb-4">
                        Angkor <span className="text-[#d4af37]">Cafe</span>
                    </h1>
                    <p className="text-white/60 text-lg lg:text-xl tracking-[0.2em] uppercase font-light">
                        Exquisite Khmer Coffee Experience
                    </p>
                </div>

                {/* Dashboard Grid - Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {[
                        { title: 'Products', icon: '🛍️', desc: 'Manage your inventory and menu items' },
                        { title: 'Cart', icon: '🛒', desc: 'View current active orders and checkout' },
                        { title: 'Checkout', icon: '💳', desc: 'Process payments and issue receipts' }
                    ].map((card) => (
                        <div 
                            key={card.title}
                            className="group p-10 rounded-[2rem] bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.07] hover:-translate-y-2 hover:border-[#d4af37]/30 transition-all duration-500 cursor-pointer relative overflow-hidden"
                        >
                            <span className="text-5xl block mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-500">{card.icon}</span>
                            <h3 className="font-['Playfair_Display'] text-3xl mb-3">{card.title}</h3>
                            <p className="text-white/50 leading-relaxed">{card.desc}</p>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#d4af37]/5 rounded-full blur-2xl group-hover:bg-[#d4af37]/10 transition-all duration-500"></div>
                        </div>
                    ))}
                </div>

                {/* Menu Section */}
                <div id="menu">
                    <Menu />
                </div>

            </main>
        </div>
    )
}

export default App
