# utils.py
import streamlit as st
import pandas as pd
from typing import Dict, Any  # Asegúrate de importar esto si safe_dataframe lo usa


def safe_dataframe(df, use_container_width=True, hide_index=True, **kwargs):
    """
    Compatible dataframe function that works with both old and new Streamlit versions
    """
    try:
        # Try new method first (Streamlit 1.25+)
        return st.dataframe(
            df, use_container_width=use_container_width, hide_index=hide_index, **kwargs
        )
    except TypeError:
        # Fallback for old versions - use pandas styling
        if hide_index:
            try:
                styled_df = df.style.hide(axis="index")
                return st.dataframe(
                    styled_df, use_container_width=use_container_width, **kwargs
                )
            except:
                try:
                    styled_df = df.style.hide_index()
                    return st.dataframe(
                        styled_df, use_container_width=use_container_width, **kwargs
                    )
                except Exception as e:
                    st.warning(f"Could not hide index for old Streamlit: {e}")
                    return st.dataframe(
                        df, use_container_width=use_container_width, **kwargs
                    )
        else:
            return st.dataframe(df, use_container_width=use_container_width, **kwargs)


def load_css_files(file_paths: list[str]):
    """Load and inject CSS styles from multiple files."""
    full_css = ""
    for file_path in file_paths:
        with open(file_path, "r") as f:
            full_css += f.read()
    st.markdown(f"<style>{full_css}</style>", unsafe_allow_html=True)
