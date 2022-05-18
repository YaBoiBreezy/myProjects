For footers you need various links throughout the page and one chunk at the bottom
with all the data for the links to link to. This is different from other components,
which are either simple or can utilize only inheritance since they render fully in one spot.
Due to this discrepancy I made two completely separate components: FooterLinks which can be put
in individually and one FooterSection which can be put in separately containing many child Footers. 
Since they render all over the place I don't know of any way to make all of them be a related like other components.

The links will automatically work once they render the HTML, this is merely an note
of how I format the files (2 sub-folders for the 2 components)