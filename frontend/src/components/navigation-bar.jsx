"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, PenSquare, BarChart2, Lightbulb, Users, LogOut, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { ethers } from 'ethers'
let provider;
if (typeof window !== 'undefined') {
    provider = new ethers.BrowserProvider(window.ethereum);
}





export default function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [walletAddress, setWalletAddress] = useState("")

    const pathname = usePathname()

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const connectWallet = async () => {
        try {
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setWalletAddress(address)
            console.log(signer, address)
            setIsConnected(true)
        } catch (error) {
            console.log(error)
        }
    }

    const disconnectWallet = () => {
        setIsConnected(false)
    }

    return (
        <nav className="bg-white border-b border-lavender-100 py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-black">MindSafe</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <NavLink
                            href="/home"
                            icon={<Home className="h-4 w-4 mr-1" />}
                            label="Home"
                            isActive={pathname === "/home"}
                        />
                        <NavLink
                            href="/post"
                            icon={<PenSquare className="h-4 w-4 mr-1" />}
                            label="Post"
                            isActive={pathname === "/post"}
                        />
                        <NavLink
                            href="/dashboard"
                            icon={<BarChart2 className="h-4 w-4 mr-1" />}
                            label="Dashboard"
                            isActive={pathname === "/dashboard"}
                        />
                        <NavLink
                            href="/reflect"
                            icon={<Lightbulb className="h-4 w-4 mr-1" />}
                            label="Reflect"
                            isActive={pathname === "/reflect"}
                        />
                        <NavLink href="/dao" icon={<Users className="h-4 w-4 mr-1" />} label="DAO" isActive={pathname === "/dao"} />

                        {isConnected ? (
                            <div className="flex items-center ml-4">
                                <Button variant="outline" className="rounded-2xl border-lavender-200 text-white mr-2">
                                    <Wallet className="h-4 w-4 mr-2" />
                                    {walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-slate-500 hover:text-red-500 cursor-pointer"
                                    onClick={disconnectWallet}
                                    aria-label="Disconnect wallet"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <Button onClick={connectWallet} className="ml-4 bg-blue-500 hover:bg-blue-600 rounded-2xl cursor-pointer">
                                <Wallet className="h-4 w-4 mr-2" />
                                Connect Wallet
                            </Button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button variant="default" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
                            {isOpen ? <p className="text-black visible">Close</p> : <Menu className="h-6 w-6 stroke-black" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={cn("md:hidden fixed inset-0 z-50 bg-white pt-16 px-4", isOpen ? "block" : "hidden")}>
                    <div className="flex flex-col space-y-4">
                        <MobileNavLink
                            href="/home"
                            icon={<Home className="h-5 w-5 mr-2" />}
                            label="Home"
                            onClick={toggleMenu}
                            isActive={pathname === "/home"}
                        />
                        <MobileNavLink
                            href="/post"
                            icon={<PenSquare className="h-5 w-5 mr-2" />}
                            label="Post"
                            onClick={toggleMenu}
                            isActive={pathname === "/post"}
                        />
                        <MobileNavLink
                            href="/dashboard"
                            icon={<BarChart2 className="h-5 w-5 mr-2" />}
                            label="Dashboard"
                            onClick={toggleMenu}
                            isActive={pathname === "/dashboard"}
                        />
                        <MobileNavLink
                            href="/reflect"
                            icon={<Lightbulb className="h-5 w-5 mr-2" />}
                            label="Reflect"
                            onClick={toggleMenu}
                            isActive={pathname === "/reflect"}
                        />
                        <MobileNavLink
                            href="/dao"
                            icon={<Users className="h-5 w-5 mr-2" />}
                            label="DAO"
                            onClick={toggleMenu}
                            isActive={pathname === "/dao"}
                        />

                        {isConnected ? (
                            <div className="pt-4 border-t border-lavender-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Wallet className="h-5 w-5 mr-2 text-slate-500" />
                                        <span className="text-slate-600">{walletAddress}</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-slate-500 hover:text-red-500"
                                        onClick={() => {
                                            disconnectWallet()
                                            toggleMenu()
                                        }}
                                        aria-label="Disconnect wallet"
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                onClick={() => {
                                    connectWallet()
                                    toggleMenu()
                                }}
                                className="w-full justify-center text-base mt-4 bg-lavender-600 hover:bg-lavender-700 rounded-2xl"
                            >
                                <Wallet className="h-5 w-5 mr-2" />
                                Connect Wallet
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

function NavLink({
    href,
    icon,
    label,
    isActive,
}) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center px-4 py-2 rounded-2xl transition-colors",
                isActive ? "bg-black" : "text-slate-600 hover:bg-lavender-50 hover:text-lavender-600",
            )}
        >
            {icon}
            <span>{label}</span>
        </Link>
    )
}

function MobileNavLink({
    href,
    icon,
    label,
    onClick,
    isActive,
}) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center py-3 px-4 text-lg rounded-2xl transition-colors",
                isActive ? "bg-lavender-100 text-lavender-700" : "text-slate-800 hover:bg-lavender-50 hover:text-lavender-600",
            )}
            onClick={onClick}
        >
            {icon}
            <span>{label}</span>
        </Link>
    )
}

