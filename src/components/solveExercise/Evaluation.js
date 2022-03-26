import React from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  selectEvaluation,
  selectEvalStatus,
  selectEvalError
} from '../../redux/solveExerciseSlice';


function Evaluation({ evaluation, status, error }) {
  let content = null;
  if (status === 'loading') {
    content = <Spinner animation="border" variant="primary" />;
  } else if (status === 'succeeded') {
    content = getMessage(evaluation);
  } else if (status === 'failed') {
    content = (
      <Alert variant="danger">
        { error }
      </Alert>
    );
  }

  return content;
}

const mapStateToProps = (state, ownProps) => {
  return {
    evaluation: selectEvaluation(state, ownProps.proposition_id),
    status: selectEvalStatus(state, ownProps.proposition_id),
    error: selectEvalError(state, ownProps.proposition_id)
  };
};

export default connect(mapStateToProps)(Evaluation);


const getMessage = (evaluation) => {
  if (evaluation.solutionToFormalization === 'OK'
      && evaluation.formalizationToSolution === 'OK') {
        return (
          <Alert variant="success">
            <b>Riešenie je správne.</b>
          </Alert>
        );
  } else if (evaluation.solutionToFormalization === 'TE'
      || evaluation.formalizationToSolution === 'TE' || evaluation.solutionToFormalization === 'ME'
      || evaluation.formalizationToSolution === 'ME') {
        return (
          <Alert variant="warning">
            Dokazovaču sa nepodarilo zistiť,
            či je vaše riešenie správne alebo nesprávne.
            <br />Na správnosť vášho riešenia sa spýtajte.
          </Alert>
        );
  } else if (evaluation.solutionToFormalization === 'OK'
      && evaluation.formalizationToSolution === 'WA') {
      if(evaluation.iFormalizationSolution !== 'null') {
          return (
              <Alert variant="danger">
                  <b>Riešenie je nesprávne.</b>
                  <br/>Vieme nájsť konkrétnu štruktúru,
                  v ktorej je hľadaná správna formalizácia pravdivá,
                  ale vaša formalizácia je nepravdivá.<br/>

                  {evaluation.m1}<br/>
                  {evaluation.domainFormalizationSolution}<br/>
                  {evaluation.iFormalizationSolution.split("\n").map((i,key) => {
                      return <div key={key}>{i}</div>;
                  })}
                  <br/>


              </Alert>
          );
      }
      else{
          return (
              <Alert variant="danger">
                  <b>Riešenie je nesprávne.</b>
                  <br />Nepodarilo sa nájsť štruktúru, na vaše riešenie sa radšej opýtajte.

              </Alert>
          );
      }
  } else if (evaluation.solutionToFormalization === 'WA'
      && evaluation.formalizationToSolution === 'OK' ) {
          if(evaluation.iSolutionToFormalization !== 'null'){
                return (
                  <Alert variant="danger">
                    <b>Riešenie je nesprávne.</b>
                    <br />Vieme nájsť konkrétnu štruktúru,
                    v ktorej je vaša formalizácia pravdivá,
                    ale hľadaná správna formalizácia je nepravdivá.<br/>
                       {evaluation.m2}<br/>
                       {evaluation.domainSolutionToFormalization}<br/>
                      {evaluation.iSolutionToFormalization.split("\n").map((i,key) => {
                          return <div key={key}>{i}</div>;
                      })}
                      <br/>

                  </Alert>
          );
        }
          else {
              return (
                  <Alert variant="danger">
                      <b>Riešenie je nesprávne.</b>
                      <br />Nepodarilo sa nájsť štruktúru, na vaše riešenie sa radšej opýtajte.
                  </Alert>
              );
          }
  } else {
          return (
              <Alert variant="danger">
                  <b>Riešenie je nesprávne.</b>
                  <br/>Vieme nájsť konkrétne štruktúry,
                  v ktorých je vaša formalizácia pravdivá,
                  ale hľadaná správna formalizácia je nepravdivá, a naopak.<br/><br/>

                          {evaluation.m2}<br/>
                          {evaluation.domainSolutionToFormalization}<br/>
                          {evaluation.iSolutionToFormalization.split("\n").map((i,key) => {
                              return <div key={key}>{i}</div>;
                          })}<br/>

                      {evaluation.m1}<br/>
                      {evaluation.domainFormalizationToSolution}<br/>
                      {evaluation.iFormalizationToSolution.split("\n").map((i,key) => {
                          return <div key={key}>{i}</div>;
                      })}
                      <br/>


              </Alert>
          );
      }
};
