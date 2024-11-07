import getWeb3 from '../utils/getWeb3'
import EducationContract from '../contracts/EducationContract.json'
import { truncateStr } from "../utils/truncateStr";
import { useAppContext } from '../context/context';

export default function ConnectBtn() {
  const {web3, account, contract, setWeb3, setAccount, setContract} = useAppContext();

    const initWeb3 = async () => {
        if(web3 && account && contract) return;
        try {
          const web3 = await getWeb3();
          const accounts = await web3.eth.getAccounts();
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = EducationContract.networks[networkId];
          const instance = new web3.eth.Contract(
            EducationContract.abi,
            deployedNetwork && deployedNetwork.address,
          );
    
          setWeb3(web3);
          setAccount(accounts[0]);
          setContract(instance);
        } catch (error) {
          alert(`Failed to load wallet`);
          console.error(error);
        }
      };
    
    //   useEffect(()=>{
    //     initWeb3();
    //   }, [])

    return (
        <button
            className="px-3 py-2 relative hover:cursor-pointer bg-blue-500 rounded"
            onClick={() => {
              initWeb3();
              setShowOption(!showOption)
            }}
        >
            {
              account? truncateStr(account, 12) : "Connect"
            }
        </button>
    );
}