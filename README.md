# Advanced Samart Contracts Assigment by Andres Ponton 101216141



# Verify if an address is a contract


There are 2 contracts in the contracts folder:
1. `Verify` 
2. `Check` 


## How does Verify work?
This is a contract that helps you know if the address is an EOA or a contract, if it is greater than 0 it means that it has code and the address is contract.
this could help you prevent attacks.
Nevertheless there is a second contract where a contracts address is being used to deploy and it does not detect it that because its invoked from the constructor in this way it tricks the security meassure.
in the same contract there is a function that uses a diffrent method to double check if the address is a contract using extcodehash.




## How to complete this exercise

1. fork and clone this project
2. install packages: npm install
3. Run ganche-cli 
4. Deploy Vefify contract 
5. Deploy Check contract using the Verify contacts address
6. Use the Verify address to use the isContract function in the Check contract.

## Special notes
I am having some issues in truffle deploy of the second contract. to fully make the contract work use Remix
