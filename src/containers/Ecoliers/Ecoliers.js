import Ecolier from '../Ecolier/Ecolier'
import classes from './Ecoliers.module.scss'

export default function Ecoliers(props) {

    return props.eleves.length > 0 
        ? (
            <div className={classes.Ecoliers}>
                {props.eleves.map(e => 
                    <Ecolier 
                        key={e.index}
                        index={e.index}
                        name={e.name} 
                        surname={e.surname} 
                        accepted={e.accepted} 
                        hobbies={e.hobbies}
                        years={e.year_of_study}
                    />
                )}
            </div>
        )
        : (<div>Liste des étudiants vide...</div>)
}