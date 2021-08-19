export default `
<Text name="name" label="Name (Text)" minLength="3" required=""></Text>
<Cell>
    <Button id="shufflename" text="Shuffle" type="outline-secondary"></Button>
    <Button id="clearname" text="Clear" type="outline-danger"></Button>
</Cell>
<Text name="username" label="Username (Text)" minLength="3" required=""></Text>
<Text name="email" label="Email (Text)" minLength="3" required=""></Text>
<ReactSelectAsync id="instituteselect" name="instituteKey" label="Institute (React Select Async)" 
    labelfield="instituteName" required=""></ReactSelectAsync>
`;