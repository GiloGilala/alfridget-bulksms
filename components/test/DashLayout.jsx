// export const BalanceInfo = ({
//   title,
//   score,
//   maxScore,
//   icon,
//   badgeColor,
//   progressColor,
// }) => {
//   return (
//     <Card className="bg-white shadow-md rounded-lg w-full p-0">
//       <CardHeader className="flex-row items-center p-2">
//         <div className="w-6 h-6 shrink-0 mr-2 rounded-full bg-blue-50 flex items-center justify-center">
//           <span className="text-sm">₦</span>
//         </div>
//         <CardTitle className="text-base">{title}</CardTitle>
//       </CardHeader>
//       <CardContent className="p-2" p-2>
//         <CardDescription>
//           <div className="flex items-center">
//             <span className="font-medium text-sm mr-auto text-gray-700 flex items-center">
//               Score
//               {/* <HelpCircle className="ml-2 shrink-0 w-5 h-5 text-gray-500" /> */}
//             </span>
//             <Badge
//               className={`px-2 py-1 rounded-lg bg-${badgeColor}-50 text-${badgeColor}-500 text-xs`}
//             >
//               {score} / {maxScore}
//             </Badge>
//           </div>
//         </CardDescription>
//         <Progress
//           value={(score / maxScore) * 100}
//           className={`overflow-hidden bg-${progressColor}-50 h-1.5 rounded-full w-full`}
//         />
//       </CardContent>
//       <CardFooter />
//     </Card>
//   );
// };
