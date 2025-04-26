import React from "react";
import Link from "next/link";
import { sanitizeUrl } from "@/lib/myFun";
import Container from "../../common/Container";
import FullContainer from "../../common/FullContainer";
import Heading from "../../common/Heading";

// Define the SVG paths for each service icon
const serviceIcons = {
  default:
    "M5,25 L55,25 M15,15 L15,35 M30,15 L30,35 M45,15 L45,35 M5,15 L55,15 M5,35 L55,35 M55,25 C60,20 60,30 55,25",
  "Chimney Inspection":
    "M10,40 L20,5 L40,5 L50,40 Z M25,40 L25,25 M35,40 L35,25 M25,20 L35,20 M15,45 L45,45 M20,50 L40,50 M30,5 L30,0",
  "Chimney Repair":
    "M15,45 L15,15 L35,15 L35,45 Z M10,15 L40,15 M10,10 L40,10 M15,35 L35,35 M15,25 L35,25 M42,30 L48,24 M48,30 C45,27 42,30 45,33",
  "Chimney Sweeping & Cleaning":
    "M20,50 L20,10 L40,10 L40,50 Z M15,10 L45,10 M15,5 L45,5 M25,10 L25,20 M35,10 L35,20 M30,20 C25,30 35,30 30,40 M25,35 L35,35",
  "Furnace Chimney Cleaning":
    "M20,50 L20,10 L40,10 L40,50 Z M15,10 L45,10 M15,5 L45,5 M25,10 L25,20 M35,10 L35,20 M30,20 C25,30 35,30 30,40 M25,35 L35,35",
  "Chimney Lining":
    "M15,45 L15,5 L35,5 L35,45 Z M10,5 L40,5 M10,45 L40,45 M20,5 L20,45 M30,5 L30,45 M15,15 L35,15 M15,25 L35,25 M15,35 L35,35",
  "Chimney Cap Repair":
    "M10,30 L20,10 L40,10 L50,30 Z M5,30 L55,30 M20,30 L20,50 M40,30 L40,50 M15,5 L45,5 M25,5 L25,10 M35,5 L35,10",
  "Fireplace Refacing":
    "M10,10 L10,45 L50,45 L50,10 Z M15,15 L45,15 L45,40 L15,40 Z M25,40 L25,30 L35,30 L35,40 M28,25 C30,20 32,25 30,30",
  "Chimney Rebuild":
    "M15,45 L15,5 L35,5 L35,45 Z M10,5 L40,5 M10,45 L40,45 M15,15 L35,15 M15,25 L35,25 M15,35 L35,35 M45,20 L50,15 M45,25 L50,20",
  "Chimney Liner":
    "M15,50 L15,10 L35,10 L35,50 Z M10,10 L40,10 M10,5 L40,5 M20,10 L20,50 M30,10 L30,50 M15,20 L35,20 M15,30 L35,30 M15,40 L35,40",
  "Chimney Maintenance":
    "M15,45 L25,5 L35,5 L45,45 Z M20,45 L40,45 M15,35 L45,35 M15,25 L45,25 M15,15 L45,15 M10,45 L50,45 M48,25 L52,20 L48,15",
  "Gas Fireplace Repair":
    "M10,10 L10,40 L50,40 L50,10 Z M15,15 L45,15 L45,35 L15,35 Z M25,35 L25,25 L35,25 L35,35 M20,20 C25,15 35,15 40,20 M30,35 L30,45",
  "Chimney Cap Installation":
    "M15,35 L15,15 L35,15 L35,35 Z M10,15 L40,15 M10,10 L40,10 M10,35 L40,35 M15,45 L35,45 M20,35 L20,45 M30,35 L30,45 M5,5 L15,15 M45,5 L35,15",
  "Chimney Flashing Repair":
    "M20,50 L20,10 L40,10 L40,50 Z M15,10 L45,10 M15,50 L45,50 M15,30 L45,30 L50,25 L45,20 L15,20 L10,25 L15,30 Z M30,10 L30,0",
  "Wood Fireplace Repair":
    "M10,10 L10,45 L50,45 L50,10 Z M15,15 L45,15 L45,40 L15,40 Z M25,40 L25,30 L35,30 L35,40 M25,25 L30,20 L35,25 M30,25 L30,20",
  "Chimney Crown Repair":
    "M15,45 L15,15 L35,15 L35,45 Z M10,15 L40,15 M10,10 L40,10 M5,10 L10,5 L40,5 L45,10 M45,25 L50,20 L45,15",
  "Chimney Damper Repair":
    "M15,45 L15,10 L35,10 L35,45 Z M10,10 L40,10 M10,45 L40,45 M10,25 L40,25 M10,30 L40,30 M20,25 C25,30 30,25 35,30",
  "Wood Burning Stove Cleaning":
    "M15,45 L15,20 L35,20 L35,45 Z M15,20 C15,15 35,15 35,20 M10,45 L40,45 M20,45 L20,30 M30,45 L30,30 M20,25 L30,25 M20,35 L30,35",
  "Chimney Flue Installation":
    "M20,50 L20,10 L40,10 L40,50 Z M15,10 L45,10 M15,5 L45,5 M25,10 L25,50 M35,10 L35,50 M25,20 L35,20 M25,30 L35,30 M25,40 L35,40",
  "Chimney Insulation":
    "M15,45 L15,5 L35,5 L35,45 Z M10,5 L40,5 M10,45 L40,45 M17,10 L33,10 M17,15 L33,15 M17,20 L33,20 M17,25 L33,25 M17,30 L33,30 M17,35 L33,35 M17,40 L33,40",
  "Chimney Pointing":
    "M15,45 L15,5 L35,5 L35,45 Z M10,5 L40,5 M10,45 L40,45 M15,15 L35,15 M15,25 L35,25 M15,35 L35,35 M45,15 L42,18 M45,25 L42,28 M45,35 L42,38",
  "Residential Duct Cleaning":
    "M5,15 L55,15 M5,35 L55,35 M10,15 L10,35 M20,15 L20,35 M30,15 L30,35 M40,15 L40,35 M50,15 L50,35 M15,25 C25,20 35,30 45,25",
  "Commercial Air Duct Cleaning":
    "M5,10 L55,10 M5,25 L55,25 M5,40 L55,40 M10,10 L10,40 M25,10 L25,40 M40,10 L40,40 M55,10 L55,40 M20,17 C30,13 40,20 50,17",
  "Hvac Cleaning":
    "M10,15 L50,15 L50,45 L10,45 Z M20,15 L20,45 M40,15 L40,45 M10,30 L50,30 M15,5 L45,5 L45,15 M15,5 L15,15",
  "Furnace Cleaning":
    "M15,10 L45,10 L45,45 L15,45 Z M10,45 L50,45 M20,10 L20,45 M40,10 L40,45 M20,25 L40,25 M30,10 L30,5",
  "Air Duct Vent Cleaning":
    "M5,20 L55,20 M5,40 L55,40 M15,20 L15,40 M30,20 L30,40 M45,20 L45,40 M15,30 C25,25 35,35 45,30 M55,25 C52,28 52,32 55,35",
  "Air Duct Vent inspection":
    "M5,20 L55,20 M5,40 L55,40 M15,20 L15,40 M30,20 L30,40 M45,20 L45,40 M50,15 C55,20 55,10 45,15",
  "Air Duct Inspection":
    "M5,20 L55,20 M5,40 L55,40 M15,20 L15,40 M30,20 L30,40 M45,20 L45,40 M50,15 C55,20 55,10 45,15 M40,50 L45,45 L50,50",
  "Ac Cleaning":
    "M10,10 L50,10 L50,40 L10,40 Z M10,25 L50,25 M20,10 L20,25 M40,10 L40,25 M15,32 C25,28 35,36 45,32",
  "Uv Disinfection":
    "M30,5 L30,45 M25,5 L35,5 M20,15 L40,15 M15,25 L45,25 M10,35 L50,35 M5,45 L55,45",
  "Scotchgard Protection":
    "M10,40 L20,10 L40,10 L50,40 L10,40 Z M15,25 L45,25 M20,15 C30,20 40,10 30,30",
  "Sofa & Couch Cleaning":
    "M5,35 L5,20 L55,20 L55,35 Z M10,35 L50,35 M15,20 L15,35 M45,20 L45,35 M20,20 C25,15 35,15 40,20",
  "Pet Stain And Odor Removal":
    "M15,45 L45,45 L45,25 L15,25 Z M20,25 C15,15 25,5 30,15 C35,5 45,15 40,25 M25,35 L35,35",
  "Area Rug Cleaning":
    "M10,15 L50,15 L50,45 L10,45 Z M15,20 L45,20 M15,30 L45,30 M15,40 L45,40 M20,15 L20,45 M30,15 L30,45 M40,15 L40,45",
  "Car Upholstery Cleaning":
    "M5,35 L15,15 L45,15 L55,35 L5,35 Z M15,35 L15,25 M45,35 L45,25 M20,22 C30,18 40,22 35,25",
  "Carpet Deodorizing":
    "M10,15 L50,15 L50,45 L10,45 Z M15,20 L45,20 M15,40 L45,40 M25,15 C20,5 40,5 35,15 M25,45 C20,55 40,55 35,45",
  "Mattress Cleaning":
    "M10,15 L50,15 L50,45 L10,45 Z M10,30 L50,30 M15,15 C20,5 40,5 45,15 M15,45 C20,55 40,55 45,45",
  "Shampoo Carpet Cleaning":
    "M10,15 L50,15 L50,45 L10,45 Z M15,20 L45,20 M15,40 L45,40 M20,25 C30,20 40,30 45,25 M15,35 C25,30 35,40 40,35",
  "Dryer Cleaning":
    "M10,15 L50,15 L50,45 L10,45 Z M15,15 L15,45 M45,15 L45,45 M25,15 L25,45 M35,15 L35,45 M15,25 L45,25 M15,35 L45,35",
  "House Vent Cleaning":
    "M15,10 L45,10 L45,40 L15,40 Z M15,25 L45,25 M10,25 L15,25 M45,25 L50,25 M50,25 C55,20 55,30 50,25",
  "Dryer Vent Inspection":
    "M10,20 L50,20 L50,40 L10,40 Z M15,20 L15,40 M45,20 L45,40 M15,30 L45,30 M50,30 C55,25 55,35 50,30 M40,15 C45,10 35,10 40,15",
  "Residential Dryer Vent Inspection":
    "M15,15 L45,15 L45,45 L15,45 Z M15,30 L45,30 M10,30 L15,30 M45,30 L50,30 M50,30 C55,25 55,35 50,30 M25,5 L35,5 L35,15 L25,15 Z",
  "Heater Vent Cleaning":
    "M15,15 L45,15 L45,45 L15,45 Z M15,30 L45,30 M20,15 L20,45 M40,15 L40,45 M25,5 L35,5 L35,15 M25,5 L25,15 M30,5 L30,15",
  "Dryer Vent Installation":
    "M10,20 L50,20 L50,40 L10,40 Z M15,20 L15,40 M45,20 L45,40 M15,30 L45,30 M50,30 C55,25 55,35 50,30 M25,10 L35,10 L35,20 L25,20 Z",
  "Exhaust Duct Cleaning":
    "M5,25 L55,25 M15,15 L15,35 M30,15 L30,35 M45,15 L45,35 M5,15 L55,15 M5,35 L55,35 M55,25 C60,20 60,30 55,25",
  "New Roof Installation":
    "M5,30 L30,5 L55,30 M10,30 L30,10 L50,30 M10,35 L50,35 M15,40 L45,40 M15,40 L15,30 M45,40 L45,30",
  "Full Roof Replacement":
    "M5,30 L30,5 L55,30 M10,30 L30,10 L50,30 M10,35 L50,35 M10,40 L50,40 M10,45 L50,45 M15,45 L15,30 M45,45 L45,30",
  "Leak Detection & Repair":
    "M5,30 L30,5 L55,30 M10,30 L30,10 L50,30 M10,35 L50,35 M15,35 L15,25 M45,35 L45,25 M25,20 C20,30 35,35 30,25",
  "Asphalt Shingle Roofing":
    "M5,30 L30,5 L55,30 M10,35 L50,35 M15,35 L15,25 M45,35 L45,25 M15,25 L45,25 M15,30 L45,30",
  "Metal Roofing":
    "M5,30 L30,5 L55,30 M10,35 L50,35 M20,35 L20,20 M30,35 L30,15 M40,35 L40,20",
  "Flat Roofing":
    "M10,20 L50,20 L50,30 L10,30 Z M15,20 L15,30 M25,20 L25,30 M35,20 L35,30 M45,20 L45,30 M10,35 L50,35",
  "Tile Roofing":
    "M5,30 L30,5 L55,30 M10,30 L30,10 L50,30 M15,30 C15,25 20,25 20,30 M25,30 C25,25 30,25 30,30 M35,30 C35,25 40,25 40,30 M45,30 C45,25 50,25 50,30",
  "Slate Roofing":
    "M5,30 L30,5 L55,30 M15,30 L15,20 L25,20 L25,30 M30,30 L30,20 L40,20 L40,30 M45,30 L45,20 L55,20 L55,30",
  "Solar Panel Roofing":
    "M5,30 L30,5 L55,30 M10,30 L30,10 L50,30 M15,30 L15,15 L45,15 L45,30 M20,15 L20,30 M30,15 L30,30 M40,15 L40,30",
  "Skylight Installation & Repair":
    "M5,30 L30,5 L55,30 M10,35 L50,35 M20,30 L20,15 L40,15 L40,30 M25,15 L25,30 M35,15 L35,30",
  "Commercial Flat Roofing Systems":
    "M5,15 L55,15 L55,35 L5,35 Z M10,15 L10,35 M20,15 L20,35 M30,15 L30,35 M40,15 L40,35 M50,15 L50,35 M5,25 L55,25",
  "Metal Roofing For Commercial Buildings":
    "M5,15 L55,15 L55,40 L5,40 Z M10,15 L10,40 M25,15 L25,40 M40,15 L40,40 M55,15 L55,40 M15,25 L50,25 M15,35 L50,35",
  "Water Damage Assessment & Inspection":
    "M15,45 L45,45 L45,15 L15,15 Z M15,30 L45,30 M25,15 L25,45 M35,15 L35,45 M20,20 C25,25 35,15 40,20",
  "Standing Water Removal":
    "M10,35 L50,35 M15,30 C20,25 30,35 35,30 C40,25 45,30 50,25 M15,40 C20,35 30,45 35,40 C40,35 45,40 50,35",
  "Basement Water Extraction":
    "M10,10 L50,10 L50,45 L10,45 Z M10,20 L50,20 M15,30 C20,25 30,35 35,30 C40,25 45,30 45,25",
  "Antimicrobial & Disinfection Treatments":
    "M15,15 L45,15 L45,45 L15,45 Z M15,30 L45,30 M25,15 L25,45 M35,15 L35,45 M20,20 C22,18 28,22 30,20 M30,40 C32,38 38,42 40,40",
  "Flooring Repairs & Replacement":
    "M10,20 L50,20 L50,40 L10,40 Z M15,20 L15,40 M25,20 L25,40 M35,20 L35,40 M45,20 L45,40 M15,30 L45,30 M25,15 L25,10 L35,10 L35,15",
  "24/7 Emergency Water Damage Response":
    "M30,5 C40,5 50,15 50,25 C50,35 40,45 30,45 C20,45 10,35 10,25 C10,15 20,5 30,5 M30,15 L30,25 L40,25",
  "Carpet & Upholstery Water Extraction":
    "M10,15 L50,15 L50,45 L10,45 Z M15,20 L45,20 M15,40 L45,40 M25,15 L25,45 M35,15 L35,45 M20,25 C25,30 30,25 35,30",
  "Mold & Mildew Prevention":
    "M20,15 C15,20 15,30 20,35 C25,40 35,40 40,35 C45,30 45,20 40,15 C35,10 25,10 20,15 M20,25 C25,20 35,30 30,25",
  "Full Structural Reconstruction":
    "M15,45 L15,15 L45,15 L45,45 M10,45 L50,45 M20,15 L20,45 M30,15 L30,45 M40,15 L40,45 M15,25 L45,25 M15,35 L45,35",
  "Odor Removal & Air Purification":
    "M20,40 C15,35 15,25 20,20 C25,15 35,15 40,20 C45,25 45,35 40,40 C35,45 25,45 20,40 M25,25 C30,30 35,25 30,20 M20,30 C25,35 30,30 25,25",
  "Sewage Backup Cleanup":
    "M10,25 L50,25 M15,20 C20,15 30,25 35,20 C40,15 45,20 50,15 M15,30 C20,25 30,35 35,30 C40,25 45,30 50,25 M15,40 C20,35 30,45 35,40 C40,35 45,40 50,35",
  "Storm & Flood Damage Restoration":
    "M5,25 L55,25 M10,20 C15,15 25,25 30,20 C35,15 45,25 50,20 M10,30 C15,25 25,35 30,30 C35,25 45,35 50,30 M10,40 C15,35 25,45 30,40 C35,35 45,45 50,40",
  "New Garage Door Installation":
    "M5,10 L55,10 L55,40 L5,40 Z M10,15 L50,15 L50,35 L10,35 Z M15,15 L15,35 M25,15 L25,35 M35,15 L35,35 M45,15 L45,35",
  "Garage Door Replacement":
    "M5,10 L55,10 L55,40 L5,40 Z M10,15 L50,15 L50,35 L10,35 Z M10,25 L50,25 M20,40 L20,45 M40,40 L40,45",
  "Custom Garage Doors":
    "M5,10 L55,10 L55,40 L5,40 Z M10,15 L50,15 L50,35 L10,35 Z M15,15 C25,25 35,15 45,25 M15,25 C25,35 35,25 45,35",
  "Garage Door Spring Repair":
    "M10,15 L50,15 L50,35 L10,35 Z M20,15 L20,35 M40,15 L40,35 M25,25 C30,20 35,30 40,25",
  "Garage Door Spring Replacement":
    "M10,15 L50,15 L50,35 L10,35 Z M20,15 L20,35 M40,15 L40,35 M25,25 C28,20 32,27 35,22 C38,17 42,24 45,25",
  "Garage Door Opener Repair":
    "M10,15 L50,15 L50,35 L10,35 Z M15,15 L15,35 M45,15 L45,35 M30,35 L30,45 M25,15 L35,15 L35,25 L25,25 Z",
  "Garage Door Cable Repair":
    "M10,15 L50,15 L50,35 L10,35 Z M15,15 L15,35 M45,15 L45,35 M15,25 L45,25 M30,35 L30,45 M30,15 L30,5",
  "Panel Replacement":
    "M10,15 L50,15 L50,35 L10,35 Z M20,15 L20,35 M30,15 L30,35 M40,15 L40,35 M25,25 L35,25",
  "Track Alignment & Repair":
    "M10,10 L10,40 M50,10 L50,40 M15,15 L45,15 M15,35 L45,35 M20,25 C25,20 35,30 40,25",
  "Roller Replacement":
    "M10,15 L50,15 L50,35 L10,35 Z M15,15 L15,35 M45,15 L45,35 M15,25 C20,20 25,30 30,25 C35,20 40,30 45,25",
  "Sensor Repair & Replacement":
    "M15,35 C15,25 25,15 35,15 C45,15 55,25 55,35 M15,25 L55,25 M25,35 L25,45 M45,35 L45,45",
  "Weather Stripping Replacement":
    "M10,15 L50,15 L50,35 L10,35 Z M10,25 L50,25 M10,20 L50,20 M10,30 L50,30",
  "Noisy Garage Door Repair":
    "M10,15 L50,15 L50,35 L10,35 Z M15,25 L45,25 M15,35 C25,25 35,35 45,25 M20,10 L25,5 M30,10 L35,5 M40,10 L45,5",
  "Remote & Keypad Repair":
    "M20,15 L40,15 L40,40 L20,40 Z M25,20 L35,20 M25,25 L35,25 M25,30 L35,30 M25,35 L35,35",
  "Garage Door Tune-Up":
    "M10,15 L50,15 L50,35 L10,35 Z M15,15 L15,35 M45,15 L45,35 M25,25 L35,25 M40,20 C45,15 50,20 45,25",
  "Opener Installation":
    "M10,15 L50,15 L50,35 L10,35 Z M30,35 L30,45 M25,15 L35,15 L35,25 L25,25 Z M25,25 L25,35 M35,25 L35,35",
  "Opener Replacement":
    "M10,15 L50,15 L50,35 L10,35 Z M30,35 L30,45 M20,15 L20,25 L40,25 L40,15 M20,25 L20,35 M40,25 L40,35",
  "Garage Door Off-Track Repair":
    "M10,10 L10,40 M50,10 L50,40 M15,15 L45,15 M15,35 L45,35 M40,20 L45,15 M40,30 L45,25",
  "Local Moving":
    "M5,35 L15,15 L45,15 L55,35 M10,35 L50,35 M20,35 L20,45 M40,35 L40,45 M25,25 L35,25 M25,20 L35,20",
  "Long-Distance Moving":
    "M5,35 L15,15 L45,15 L55,35 M10,35 L50,35 M15,25 L45,25 M20,35 L20,45 M40,35 L40,45 M15,20 L25,10 M35,20 L45,10",
  "Residential Moving":
    "M5,30 L30,5 L55,30 M15,30 L15,45 L45,45 L45,30 M25,45 L25,35 L35,35 L35,45 M15,35 L45,35",
  "Commercial/Office Moving":
    "M10,10 L50,10 L50,45 L10,45 Z M10,20 L50,20 M10,30 L50,30 M10,40 L50,40 M20,10 L20,45 M30,10 L30,45 M40,10 L40,45",
  "Furniture Moving":
    "M10,20 L50,20 L50,45 L10,45 Z M15,20 L15,45 M45,20 L45,45 M15,30 L45,30 M25,45 L25,35 L35,35 L35,45",
  "Piano Moving":
    "M10,25 L50,25 L50,45 L10,45 Z M15,25 L15,45 M45,25 L45,45 M15,35 L45,35 M20,25 L20,15 M40,25 L40,15 M20,15 L40,15",
  "Military Moving":
    "M15,45 L45,45 L45,15 L15,15 Z M15,30 L45,30 M25,15 L25,30 M35,15 L35,30 M25,15 L25,10 L35,10 L35,15",
  "Full-Service Packing & Unpacking":
    "M15,15 L45,15 L45,45 L15,45 Z M15,25 L45,25 M20,15 L20,45 M30,15 L30,45 M40,15 L40,45 M25,10 L35,10 M25,5 L35,5",
  "Storage Solutions":
    "M10,15 L50,15 L50,45 L10,45 Z M15,15 L15,45 M25,15 L25,45 M35,15 L35,45 M45,15 L45,45 M10,25 L50,25 M10,35 L50,35",
  "Last-Minute Or Emergency Moves":
    "M30,10 C40,10 50,20 50,30 C50,40 40,50 30,50 C20,50 10,40 10,30 C10,20 20,10 30,10 M30,20 L30,30 L40,30 M15,20 L45,45",
  "Apartment Moving":
    "M10,10 L50,10 L50,45 L10,45 Z M10,20 L50,20 M10,30 L50,30 M10,40 L50,40 M30,10 L30,45 M25,40 L35,40",
  "Senior Moving Services":
    "M15,45 L45,45 L45,15 L15,15 Z M20,15 L20,45 M40,15 L40,45 M15,30 L45,30 M25,10 C30,5 35,10 40,15",
};

const OurServices = ({ data,phone }) => {
  if (!data) return null;

  const { tagline, heading, description, list = [] } = data;

  return (
    <>
      {data.service ? (
        <section className="services-section py-12 bg-white">
          <Container className="container mx-auto px-4">
            <Heading text="Services Provided" className="text-center text-[2rem] font-bold text-blue-900 mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {list?.map((service) => (
                <div key={service.id} className="service-card bg-white rounded-lg overflow-hidden border border-gray-100">
                  {/* Service Image */}
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src={service.image || "/placeholder-service.jpg"} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Service Content */}
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-[#002B5B] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 min-h-[40px]">
                      {service.description}
                    </p>
                    <Link
                           href={`tel:${phone}`}

                      className="inline-block bg-[#002B5B] text-white px-6 py-2 rounded-full text-sm hover:bg-blue-900 transition-colors"
                    >
                      Call Us Today
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
          
          <style jsx>{`
            .service-card {
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .service-card:hover {
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
              transform: translateY(-2px);
              transition: all 0.3s ease;
            }
          `}</style>
        </section>
      ) : (
        <section className="services-section py-6 md:py-12 ">
          <Container className="container mx-auto px-4">
            <Heading text="Services Provided" className="mb-6 md:mb-10" />

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-[10px] gap-x-1.5 md:gap-x-6">
              {list?.map((service) => (
                <Link
                  href={`/${sanitizeUrl(
                    service.title.toLowerCase().replace(/\s+/g, "-")
                  )}`}
                  key={service.id}
                  className="service-item flex items-center bg-white text-primary rounded-full py-1 md:py-[10px] px-3 md:px-5 shadow-[0_0_10px_rgba(0,0,0,0.4)] transition-all duration-300"
                >
                  <div className="service-icon mr-3 text-primary ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 60 60"
                      width="30"
                      height="30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        d={
                          serviceIcons[service.title] || serviceIcons["default"]
                        }
                      />
                    </svg>
                  </div>
                  <span className="font-barlow font-medium leading-[1.1] text-[13px] sm:text-sm md:text-lg">
                    {service.title}
                  </span>
                </Link>
              ))}
            </div>
          </Container>

          <style jsx>{`
            .service-icon {
              color: #0047ab;
            }
          `}</style>
        </section>
      )}
    </>
  );
};

export default OurServices;
