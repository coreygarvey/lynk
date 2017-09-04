// Gas Testing Psudocode
/*
function compareGas{
	project1;
	versions[100]
	insertGas1Values[100]
	insertGas2Values[100]
	returnGas1Values[100]
	returnGas2Values[100]
		

	// Create arrays of all amounts of Gas needed to both store and query contract at different points
	for(i=0; i<100; i++){
		inputGas1 = project1.addVersion(versions[i])
		inputGas1Values.append(inputGas1)
		returnGas1 = project1.returnVersion(versions[i])
		returnGas1Values.append(returnGas1)

		inputGas2 = project2.addVersion(versions[i])
		inputGas2Values.append(inputGas2)
		returnGas2 = project2.returnVersion(versions[i])
		returnGas2Values.append(returnGas2)
	}


	// Get Statistics about Gas growth
	input1Stats
	return1Stats
	input2Stats
	return2Stats

	mean
	median
	growth/growth factor
	Graph of growths
}
*/